import axios from 'axios';

const getDiscordMessages = async () => {
  try {
    const response = await axios.get('https://discord.com/api/v9/channels/585084330037084180/messages', {
      params: {
        before: '1169915871934816336',
        limit: 50,
      },
      headers: {
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        Authorization: 'MzgwMDMwMDQ3MzIwNTM.BMc1kktfAmPdl9s7rDbvgpxCURA8LTAAO9puOw',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Cookie: 'your_cookies_here',
        Pragma: 'no-cache',
        Referer: 'https://discord.com/channels/585084330037084172/585084330037084180',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        'X-Debug-Options': 'bugReporterEnabled',
        'X-Discord-Locale': 'en-US',
        'X-Discord-Timezone': 'America/New_York',
        'X-Super-Properties': 'encoded_super_properties_here',
        'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
      // Axios automatically handles decompression of compressed responses, no need for the `--compressed` flag
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// getDiscordMessages();
