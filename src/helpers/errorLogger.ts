import axios from 'axios';

export function formatAxiosError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return { data: error.response.data, status: error.response.status, headers: error.response.headers };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return { request: error.request };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { message: error.message };
  }
}

async function postErrorOnDiscord(e: Error | null, spaceId: string | null, blockchain: string | null, message: string, params: Record<string, any> = {}) {
  if (message === 'invalid request request') {
    return;
  }
  const embeds = [
    {
      title: 'Request Info',
      fields: [
        {
          name: 'SpaceId',
          value: spaceId || '----',
          inline: true,
        },
        {
          name: 'Blockchain',
          value: blockchain || '----',
          inline: true,
        },
        {
          name: 'Message',
          value: (message || '----').substr(0, 1000),
          inline: false,
        },
        {
          name: 'Params',
          value: JSON.stringify(params || {}).substr(0, 1000),
          inline: false,
        },
      ],
    },
  ];
  if (e) {
    embeds.push({
      title: 'Error',
      fields: [
        {
          name: 'Stack',
          value: (e.stack || '----').substr(0, 1000),
          inline: false,
        },
      ],
    });
  }

  const data = {
    content: `Got an error on ${process.env.SNAPSHOT_URI}`,
    embeds,
  };

  axios.post(process.env.SERVER_ERRORS_WEBHOOK!, data).catch((err) => {
    console.log(formatAxiosError(err));
    console.log(JSON.stringify(embeds, null, 2));
  });
}

export async function logError(
  message: string,
  params: Record<string, any> = {},
  e: Error | null = null,
  spaceId: string | null = null,
  blockchain: string | null = null
) {
  console.error(
    e,
    JSON.stringify({
      spaceId,
      blockchain,
      message,
      params,
    })
  );
  await postErrorOnDiscord(e, spaceId, blockchain, message, params);
}

export async function logErrorRequest(e: Error | null, body: any) {
  if (e?.message === 'invalid request request') {
    return;
  }
  console.error(e);

  const data = body.data;
  const { message } = data;
  await postErrorOnDiscord(e, message.space ?? null, message.blockchain ?? null, e?.message || 'Error in Request', {
    message,
  });
}
