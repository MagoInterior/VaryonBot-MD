import yts from 'yt-search'
import ytdl from '../lib/ytdl2.js'
import fs from 'fs'
const more = String.fromCharCode(8206)
const readMore = more.repeat(850)
let handler = async (m, { conn, text }) => {
	if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
    if (!text) return m.reply(`*Ingresa el título de una canción*`)
    m.react(rwait)
    let vid = (await yts(text)).all[0]
    if (!vid) return m.reply(`Sin resultados`)
    let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
    let play = `${cuadro} ${tituloemoji} *Titulo :* ${title}\n${cuadro} ${publicadoemoji} *Publicado :* ${ago}\n${cuadro} ${duracionemoji} *Duración :* ${timestamp}\n${cuadro} ${vistasemoji} *Vistas :* ${views}\n\nCargando audio${readMore}\n*📎 Link :* https://www.youtube.com/watch?v=${videoId}`
    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: play, }); try {
        let _Url = `https://www.youtube.com/watch?v=${videoId}`
        const audio = await ytdl.mp3(_Url)
        await conn.sendMessage(m.chat, { audio: fs.readFileSync(audio.path), contextInfo: { externalAdReply: { title: audio.meta.title, body: `${author}`, previewType: "PHOTO", thumbnailUrl: null, thumbnail: await ytdl.fetchBuffer(audio.meta.image), sourceUrl: _Url } }, mimetype: "audio/mp4", fileName: `${title}.mp3` }, { quoted: m }); m.react(done); if (global.ajustes.cmdRpg) return m.coin = true; fs.unlinkSync(audio.path)
    } catch { await m.react(error) }
}
handler.help = ['playmp3']
handler.tags = ['dl', 'servicio']
handler.command = ['playad', 'playmp3', 'yta', 'audio']
handler.exp = 3

export default handler