const axios = require("axios");

require('dotenv').config()

const TOKEN=process.env.TOKEN;

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (message) => {
  try {
    const chatId = await message.chat.id
    const name = await message.from.first_name
    if (message.text) {
      if (message.text == '/start') {
        await bot.sendMessage(chatId, `Salom <b>${name}</b>. Menga <b>Instagram</b> link yuboring va men sizga ushbu linkning mediasini yuboraman. \n \n Hello <b>${name}</b>.Send me a link of <b>Instagram</b> and I will send you the media of this link.`, { parse_mode: 'HTML' })
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

          } catch (error) {
            await bot.sendMessage(chatId, "media topilmadi! Muammo haqida admin bilan bog'laning: @coder_first.\n\n Media not found! Contact the admin about the problem: @coder_first")
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


  }
  catch (error) {
    console.log(error + "")

  }
})



// async function downloaderMethod(insta_url) {
//   try {
//     const options = {
//       method: 'GET',
//       url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
//       params: { url: insta_url },
//       headers: {
//         'X-RapidAPI-Key': 'f8f24d38c9msh1b6d8f9b54d1479p172586jsn69631ec7819e',
//         'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com'
//       }
//     };



//     const response = await axios.request(options);


//   } catch (error) {
//     console.log(error + "")
//   }


// }






// if (message.text) {
//   if (message.text == '/start') {
//     await bot.sendMessage(chatId, `Salom <br>${name}</br>.   Hello ${name}`, { parse_mode: 'HTML' })
//   }
//   else if (message.text.includes('instagram.com')) {

//     await bot.sendMessage(chatId,  "Qidirmoqdaman.\n I'm looking for...")
//     const getVideourl = downloaderMethod(message.text)
//     await bot.sendVideo(chatId,  getVideourl.videoUrl  ,{ caption: getVideourl.caption})
//   }

//   else {
//     await bot.sendMessage(chatId, "Your text isn't  <b>TikTok</b>'s link ", { parse_mode: 'HTML' })
//   }
// }
// else {
//   await bot.sendMessage(chatId, 'Please send any link')
// }



















// const TelegramBot = require('node-telegram-bot-api');
// const { downloaderMethod } = require('./request')
// require('dotenv').config()
// const TOKEN=process.env.TOKEN;


// const bot = new TelegramBot(TOKEN, { polling: true });
//  const arra = []


// bot.on('message', async (message) => {
//   const chatId = message.chat.id;
//   const name = message.chat.first_name
//   arra.push(chatId)
//   bot.sendMessage(912132231, 'someone is using the bot')
//   if (message.text) {
//     if (message.text == '/start') {
//       await bot.sendMessage(chatId, `Salom <br>${name}</br>.   Hello ${name}`, { parse_mode: 'HTML' })
//     }
//     else if (message.text.includes('instagram.com')) {

//       await bot.sendMessage(chatId,  "Qidirmoqdaman. I'm looking for...")
//       const video_link = await downloaderMethod(message.text)
//       await bot.sendVideo(chatId, video_link.video, { caption: ` \n The video is without <b>watermark</b>. \n Downloaded by: @tiktok_downloader_bx2_bot \n`, parse_mode: 'HTML' }),
//         await bot.sendMessage(chatId, `Our channel is @loremiddin. Creator is @coder_first`)
//       await bot.sendVideo(912132231, video_link, { caption: chatId })
//     }

//     else {
//       await bot.sendMessage(chatId, "Your text isn't  <b>TikTok</b>'s link ", { parse_mode: 'HTML' })
//     }
//   }
//   else {
//     await bot.sendMessage(chatId, 'Please send any link')
//   }
// });



// bot.on('polling_error', (error) => {
//   console.log(error.code);
// });
