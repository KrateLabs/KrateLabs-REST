import express from 'express'
import { exec } from 'child_process'

const router = express.Router()

const gitPull = (request, response) => {
  let command = 'git pull'
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return response.json({
        status: 500,
        command: command,
        ok: false,
        error: stderr.trim()
      })
    }
    response.json({
      status: 200,
      command: command,
      results: stdout.trim(),
      ok: true
    })
  })
}

router.route('/')
  .get(gitPull)
  .post(gitPull)

export default router
