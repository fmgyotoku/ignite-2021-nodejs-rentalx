import fs from 'fs'

export const deleteFile = async (filename: string) => {
  try { 
    await fs.promises.stat(filename) 
  } catch { 
    console.log(`File ${filename} not found`)
    return 
  }

  await fs.promises.unlink(filename)
}