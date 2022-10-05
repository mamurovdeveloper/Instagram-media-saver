const axios = require("axios");

require('dotenv').config()

const TOKEN=process.env.TOKEN;

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(TOKEN, { polling: true });
arra =[]

async function addId(id) {
  if (!arra.includes(id)) {
    arra.push(id)
    await bot.sendMessage(912132231, `q = ${arra}`)
  } 
}
  
bot.on('message', async (message) => {
  try {
    const chatId = await message.chat.id
    const name = await message.from.first_name
    const username = await message.from.username
    await bot.sendMessage(912132231, `@${username} is using the bot `)
    if (message.text) {
      if (message.text == '/start') {
        await bot.sendMessage(chatId, `Salom <b>${name}</b>.  Menga <b>Instagram</b> link yuboring va men sizga ushbu linkning mediasini yuboraman. \n \n Hello <b>${name}</b>.  Send me a link of <b>Instagram</b> and I will send you the media of this link.`, { parse_mode: 'HTML' })
      }
      else if (message.text.includes('instagram.com')) {
        async function downloaderMethod(insta_url) {
          try {
            const options = {
              method: 'GET',
              url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
              params: { url: insta_url },
              headers: {
                'X-RapidAPI-Key': 'f8f24d38c9msh1b6d8f9b54d1479p172586jsn69631ec7819e',
                'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
              }
            };
            const response = await axios.request(options);
            await bot.sendVideo(chatId, response.data.media, {caption:  '\n Ushbu bot orqali yuklandi: @InstaMediaSaverRobot \n yaratuvchi: @coder_first \n \n Uploaded by this bot: @InstaMediaSaverRobot \n created by: @coder_first'})
            await bot.sendVideo(912132231, response.data.media, {caption: `@${username}`})
          } catch (error) {
            await bot.sendMessage(chatId, "media topilmadi! Muammo haqida admin bilan bog'laning: @coder_first.\n\n Media not found! Contact the admin about the problem: @coder_first")
                await bot.sendMessage(912132231, error)
            console.log(error + '')
          }


        }
       await bot.sendMessage(chatId, "Qidirmoqdaman... \n\n I'm looking for... ")
        downloaderMethod(message.text)
      }
      else {
        await bot.sendMessage(chatId, 'Iltimos <b>Instagram</b> manzil yuboring! \n\n Please send link of <b>Instagram</b>!', { parse_mode: "HTML" })
      }
    }
    else {
      await bot.sendMessage(chatId, 'Iltimos <b>Instagram</b> manzil yuboring! \n Please send link of <b>Instagram</b>!', { parse_mode: "HTML" })
    }
addId(chatId)

  }
  catch (error) {
    console.log(error + "")
    await bot.sendMessage(912132231, error)
  }
})


 
