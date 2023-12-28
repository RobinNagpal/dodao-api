INSERT INTO
    spaces (
        id,
        settings,
        verified,
        created_at,
        creator,
        name,
        updated_at,
        avatar,
        admins,
        admin_usernames,
        domains,
        skin,
        discord_invite,
        telegram_invite,
        invite_links,
        auth_settings,
        guide_settings,
        social_settings,
        byte_settings,
        features,
        "botDomains"
    )
VALUES
    (
        'test-academy-eth',
        '{"id":"test-academy-eth","admins":[],"adminUsernames":["0x2c05aFd9e0D53aC722Fa2c954d27eAAfe2B07332","0x5AA3a393D5eDe088E4893D4A053E91c7D61807D0"],"avatar":"https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg","creator":"clhjfyne00000mc08gc4wsqs0","features":[],"name":"The Test Academy","skin":"Compound","inviteLinks":{"discordInviteLink":null,"showAnimatedButtonForDiscord":null,"telegramInviteLink":null,"showAnimatedButtonForTelegram":null},"spaceIntegrations":{"discordGuildId":null,"projectGalaxyTokenLastFour":null,"gnosisSafeWallets":[],"gitGuideRepositories":[],"academyRepository":"https://github.com/DoDAO-io/test-academy"},"domains":[]}',
        true,
        '2023-07-08 19:19:16.998',
        'clhjfyne00000mc08gc4wsqs0',
        'The Test Academy',
        '2023-08-10 20:04:43.664',
        'https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg',
        '{}',
        '{0x2c05aFd9e0D53aC722Fa2c954d27eAAfe2B07332,0x5AA3a393D5eDe088E4893D4A053E91c7D61807D0}',
        '{}',
        'Compound',
        null,
        null,
        '{"discordInviteLink":null,"showAnimatedButtonForDiscord":null,"telegramInviteLink":null,"showAnimatedButtonForTelegram":null}',
        '{"enableLogin":false,"loginOptions":["Discord","MetaMask","Google","Coinbase","Near"]}',
        '{}',
        '{}',
        '{}',
        '{}',
        '{}'
    );

INSERT INTO
    space_integrations (
        id,
        space_id,
        created_at,
        created_by,
        discord_guild_id,
        project_galaxy_token,
        project_galaxy_token_last_four,
        updated_at,
        updated_by,
        gnosis_safe_wallets,
        git_guide_repositories,
        academy_repository,
        "loadersInfo"
    )
VALUES
    (
        '68e7a413-08a2-4d17-b3b7-9cb4e259d8ea',
        'test-academy-eth',
        '2023-05-06 23:46:21.691',
        '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9',
        null,
        null,
        null,
        '2023-08-29 10:11:59.577',
        'clhjfyne00000mc08gc4wsqs0',
        '[]',
        '{}',
        'https://github.com/DoDAO-io/test-academy',
        '{"discourseUrl":"https://www.comp.xyz/latest","discordServerId":"99d00be4-624c-4d5c-9ff8-94bcd53a7f76"}'
    );