//import YoutubeMp3Downloader from 'youtube-mp3-downloader'
//import fs from 'fs/promises'
//import { Uploadable } from 'openai/uploads.mjs'
//import { transcribeAudio } from '@/lib/ai/providers/openai'

export const youTubeETLAction = async () => {
  const outputPath = './data/mp3'

  //const ymd = new YoutubeMp3Downloader({
  //  outputPath,
  //  ffmpegPath: '/opt/homebrew/bin/ffmpeg',
  //  youtubeVideoQuality: 'highestaudio',
  //  queueParallelism: 2,
  //  progressTimeout: 2_000,
  //  allowWebm: false,
  //})

  //const paths = ['YNctsu-oJCk', 'yc4JR7gd5O4']
  //for (const path of paths) {
  //  ymd.download(path)
  //}

  //const files = await fs.readdir(outputPath)
  //for (const file of files) {
  //  const stream = await fs.readFile(`${outputPath}/${file}`, 'utf8')
  //  // TODO: Fix
  //  //const { text } = await transcribeAudio(stream)
  //  const text = ''
  //  await fs.writeFile(`./data/transcripts/${file}.txt`, text)
  //}
}
