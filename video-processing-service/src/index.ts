import express from 'express';
import {
  convertVideo,
  deleteProcessedFile,
  deleteRawFile,
  downloadRawVideo,
  setupDirectories,
  uploadProcessedVideo,
} from './storage';

setupDirectories();

const app = express();
app.use(express.json());

app.post('/process-video', async (req, res) => {
  // Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString(
      'utf-8'
    );
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload received');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Bad Request: Missing Filename');
  }

  // Download the video from the bucket to a local repository
  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  // Download the raw video from GCS
  await downloadRawVideo(inputFileName);

  // Convert video to 360p
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (error) {
    await Promise.all([
      deleteRawFile(inputFileName),
      deleteProcessedFile(outputFileName),
    ]);
    console.error(error);
    return res
      .status(500)
      .send('Internal Server Error: Video Processing failed');
  }

  // Upload the processed video to Cloud Storage
  await uploadProcessedVideo(outputFileName);

  await Promise.all([
    deleteRawFile(inputFileName),
    deleteProcessedFile(outputFileName),
  ]);

  return res.status(200).send('Processing finished successfully');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});
