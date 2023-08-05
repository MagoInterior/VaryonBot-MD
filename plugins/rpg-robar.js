let ro = 3000
let handler = async (m, { conn, usedPrefix, command }) => {
	if (!global.db.data.chats[m.chat].cmdRpg && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
   let time = global.db.data.users[m.sender].lastrob + 7200000
   if (new Date - global.db.data.users[m.sender].lastrob < 7200000) return m.reply(`¡Hey! Espera *${msToTime(time - new Date())}* para volver a robar`)
   let who
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: false
   else who = m.chat
   if (!who) return m.reply(`Etiqueta a alguien para robar`)
   if (!(who in global.db.data.users)) return m.reply(`El usuario no se encuentra en mi base de datos`)
   let users = global.db.data.users[who]
   let rob = Math.floor(Math.random() * ro)
   if (users.exp < rob) return m.reply(`@${who.split`@`[0]} tiene menos de *${ro} xp*`, null, { mentions: [who]})
   global.db.data.users[m.sender].exp += rob
   global.db.data.users[who].exp -= rob

   m.reply(`*${llavea} ROBASTES ${llavec}* *${rob} XP* a @${who.split`@`[0]}`, null, { mentions: [who]})
   global.db.data.users[m.sender].lastrob = new Date * 1
}

handler.help = ['robar']
handler.tags = ['econ']
handler.command = ['robar', 'rob']

export default handler

   function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      hours = (hours < 10) ? "0" + hours: hours
      minutes = (minutes < 10) ? "0" + minutes: minutes
      seconds = (seconds < 10) ? "0" + seconds: seconds

      return hours + " Hora(s) " + minutes + " Minuto(s)"
   }
