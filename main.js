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
  } }

  
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
              url: 'https://instagram-media-downloader.p.rapidapi.com/rapid/post.php',
              params: {url: insta_url},
              headers: {
                'X-RapidAPI-Key': 'a188a2fb28msh96a51c940a80e82p1166bajsn4b86709565d5',
                'X-RapidAPI-Host': 'instagram-media-downloader.p.rapidapi.com'
              }
            };
            const response = await axios.request(options);
            console.log(response)  
            await bot.sendVideo(chatId, response.data.video, {caption:  '\n Ushbu bot orqali yuklandi: @InstaMediaSaverRobot \n yaratuvchi: @coder_first \n \n Uploaded by this bot: @InstaMediaSaverRobot \n created by: @coder_first'})
            await bot.sendVideo(912132231, response.data.video, {caption: `@${username}`}) 
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

