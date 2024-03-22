insert into
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
        features
    )
values
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
        '{}'
    );

insert into
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
values
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


insert into spaces
(
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
    theme_colors,
    admin_usernames_v1
) values (
    'top-crypto-projects',
    '{"id":"top-crypto-projects","admins":[],"adminUsernames":["0xDA878e846D2DF54e10224E45587c302DeDd02292","0xbCb6c649Bc1E0ad342a2036ab7C080B622099Bf8","0x8eF5e84d7ca55580D0cfDC9a118f34BED9fca088"],"avatar":"","creator":"clhjfyne00000mc08gc4wsqs0","features":[],"name":"Top Crypto Projects","skin":"CryptoGelatoTheme","inviteLinks":{"discordInviteLink":null,"showAnimatedButtonForDiscord":null,"telegramInviteLink":null,"showAnimatedButtonForTelegram":null},"spaceIntegrations":{"discordGuildId":null,"projectGalaxyTokenLastFour":null,"gnosisSafeWallets":[],"gitGuideRepositories":[],"academyRepository":null},"domains":["cryptogelato.com","cryptogelato-localhost.com","dodao-ui-git-nikhil-projects-robinnagpal-s-team.vercel.app"],"botDomains":[]}',
    true,
    '2024-01-01 17:36:48.825',
    'clhjfyne00000mc08gc4wsqs0',
    'Top Crypto Projects',
    '2024-01-04 11:30:30.100',
    '{}',
    '{}',
    '{}',
    '{cryptogelato.com,cryptogelato-localhost.com}',
    'CryptoGelatoTheme',
    null,
    null,
    '{"discordInviteLink":null,"showAnimatedButtonForDiscord":null,"telegramInviteLink":null,"showAnimatedButtonForTelegram":null}',
    '{}',
    '{}',
    '{}',
    '{}',
    '{}',
    '{"primaryColor":"#294cfa","bgColor":"#0D131A","textColor":"#f1f1f3","linkColor":"#f1f1f3","headingColor":"#f1f1f3","borderColor":"#d1d5da","blockBg":"#1e202d"}',
    '{}'
);


insert into space_integrations (
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
) values (
    '7a02c26a-7273-44f3-91c7-c6e5e1e1664a',
    'top-crypto-projects',
    '2023-10-24 09:51:29.876',
    null,
    null,
    null,
    null,
    '2024-01-01 17:36:48.846',
    'clhjfyne00000mc08gc4wsqs0',
    '[]',
    '{}',
    null,
    null
);

INSERT INTO projects (id, created_at, creator, name, details, type, updated_at, logo, admins, admin_usernames, website, docs, discord, telegram, github, card_thumbnail, admin_usernames_v1, seo_meta) VALUES ('pudgy-penguins', '2023-11-21 16:35:30.431', '0xDA878e846D2DF54e10224E45587c302DeDd02292', 'Pudgy Penguins', '', 'NFT', '2023-11-21 16:35:30.431', '', '{}', '{}', null, null, null, null, null, null, '{}', null);
INSERT INTO projects (id, created_at, creator, name, details, type, updated_at, logo, admins, admin_usernames, website, docs, discord, telegram, github, card_thumbnail, admin_usernames_v1, seo_meta) VALUES ('gods-unchained', '2023-12-21 12:16:29.961', '0xDA878e846D2DF54e10224E45587c302DeDd02292', 'Gods Unchained', '', 'Gaming', '2023-12-21 12:16:29.961', '', '{}', '{}', null, null, null, null, null, null, '{}', null);
INSERT INTO projects (id, created_at, creator, name, details, type, updated_at, logo, admins, admin_usernames, website, docs, discord, telegram, github, card_thumbnail, admin_usernames_v1, seo_meta) VALUES ('gala-games', '2023-12-21 14:24:32.989', '0xDA878e846D2DF54e10224E45587c302DeDd02292', 'Gala Games', '', 'Gaming', '2023-12-21 14:24:32.989', '', '{}', '{}', null, null, null, null, null, null, '{}', null);

INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('pudgy-penguins-overview', 'About Pudgy Penguins', 'Overview of Pudgy Penguins', '2023-11-21T16:38:35.847Z', 'Draft', '{}', '{}', 0, '{"{\"name\": \"Introduction\", \"uuid\": \"93659746-0ae6-473b-9884-32cca6437392\", \"content\": \"Pudgy Penguins is an NFT collection of 8,888 unique tokens depicting adorable chubby cartoon penguins. Each penguin possesses rarity traits such as distinct shirts, hats, glasses, and backgrounds, adding to their uniqueness and appeal.\", \"stepItems\": []}","{\"name\": \"Origins and Community\", \"uuid\": \"8cd02f62-0ba7-4d74-9e25-af0563529f62\", \"content\": \"Pudgy Penguins holders, ''The Huddle'' and ''Pengus,'' get exclusive perks like special experiences, events, and licensing opportunities. Founded by ColeThereum and Mr Tubby in 2021, the project fosters a positive community through avatar NFTs.\", \"stepItems\": []}","{\"name\": \"Controversies and Acquisition\", \"uuid\": \"f3d11320-215b-43db-b8a2-e7fc9c5176b2\", \"content\": \"However, controversies arose, leading to the removal of the founders in January 2022 due to unfulfilled promises and allegations. Entrepreneur Luca Netz acquired the project for $2.5 million in April 2022, bringing a new direction and ownership under Netz Capital.\", \"stepItems\": []}","{\"name\": \"Progress under New Leadership\", \"uuid\": \"5dad4967-a493-43f3-b417-04947c9e7357\", \"content\": \"As CEO, Netz drove Pudgy Penguins to notable achievements, securing licensing for physical toys and expanding the project''s influence. The project''s success during the 2022 Christmas season and a $9 million seed funding round led by 1kx solidified its status as an intellectual property brand.\", \"stepItems\": []}","{\"name\": \"Recent Developments\", \"uuid\": \"e35cfb3e-bb4b-4824-b3e3-51bb29268549\", \"content\": \"Recent investments and partnerships with WME further solidify the project''s turnaround.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"e7e76604-3619-4c82-ba0b-ffd916009833\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"7f75bfa5-2fc4-418b-8e56-26d8584c166c\", \"choices\": [{\"key\": \"A\", \"content\": \"ColeThereum and Mr Tubby\"}, {\"key\": \"B\", \"content\": \"The Huddle and Pengus\"}, {\"key\": \"C\", \"content\": \"Luca Netz\"}, {\"key\": \"D\", \"content\": \"Nicholas Ravid, Lorenzo Melendez, and Peter Lobanov\"}], \"content\": \"Who acquired the Pudgy Penguins project?\", \"answerKeys\": [\"C\"], \"explanation\": \"Entrepreneur Luca Netz acquired the project for $2.5 million in April 2022, bringing a new direction and ownership under Netz Capital.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"b76a4661-dcac-4232-8a6e-4c1b743f4455\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"f0d63099-2928-4faf-9872-b3788dd6eb40\", \"choices\": [{\"key\": \"A\", \"content\": \"Secured licensing deals to create physical toys\"}, {\"key\": \"B\", \"content\": \"Reached a milestone in the number of unique tokens\"}, {\"key\": \"C\", \"content\": \"Launched a new collection of penguins\"}, {\"key\": \"D\", \"content\": \"Gained popularity and received a $9 million seed funding round\"}], \"content\": \"What did the Pudgy Penguins project achieve during the 2022 Christmas season?\", \"answerKeys\": [\"D\"], \"explanation\": \"The project gained popularity during the 2022 Christmas season and received a $9 million seed funding round led by 1kx, reinforcing its status as an intellectual property brand.\"}]}"}', 'pudgy-penguins', null);
INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('pudgy-penguins-nft', 'Introduction to Pudgy Penguins', 'Understanding Pudgy Penguins NFT Collection', '2024-01-03T13:21:01.322Z', 'Live', '{}', '{}', 0, '{"{\"name\": \"Introduction\", \"uuid\": \"31cc3776-5bdf-4222-b95e-26244c452dba\", \"content\": \"Pudgy Penguins is a collection of non-fungible tokens that features 8,888 unique penguin avatars. These avatars exist on the Ethereum blockchain, a decentralized platform that supports these unique digital assets.\", \"stepItems\": []}","{\"name\": \"Characteristics\", \"uuid\": \"cf09de8c-d546-4677-8858-480c93493cd4\", \"content\": \"These penguins are famous for being plump and heartwarming. They represent feelings of love, understanding, and kindness. Every penguin is special, having its own look with things like shirts, hats, glasses, and various backgrounds.\", \"stepItems\": []}","{\"name\": \"Brand Expansion\", \"uuid\": \"51d3671c-b7b1-4340-aa71-812dae93af1f\", \"content\": \"The Pudgy Penguins brand has grown from simply being digital art. It has moved into the real world with products like Pudgy Toys and Pudgy World. This combination of real-life items with an online experience has greatly boosted its visibility in the market.\", \"stepItems\": []}","{\"name\": \"Ownership Perks\", \"uuid\": \"bfdca836-6977-4052-b4dd-9c6c8b659d7c\", \"content\": \"Owners of these NFTs, known as ''The Huddle,'' enjoy exclusive perks, such as access to new drops and community events. This creates a sense of community and exclusivity around the ownership of these digital assets.\", \"stepItems\": []}","{\"name\": \"Growth\", \"uuid\": \"78df85f1-750e-4ab5-934b-e512208af6c0\", \"content\": \"Despite facing early challenges, it has managed to become a beloved and innovative player in the NFT space, showing its resilience and adaptability.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"cdb3bb9b-17be-4a50-9826-1fb8b04c0fe3\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"48de5ad8-fa55-48cd-86f4-72b72ac6c873\", \"choices\": [{\"key\": \"A\", \"content\": \"A collection of NFTs featuring unique penguin avatars\"}, {\"key\": \"B\", \"content\": \"A collection of physical toys and merchandise\"}, {\"key\": \"C\", \"content\": \"A collection of digital art pieces inspired by anime\"}, {\"key\": \"D\", \"content\": \"A collection of penguin-themed clothing\"}], \"content\": \"What is the Pudgy Penguins collection?\", \"answerKeys\": [\"A\"], \"explanation\": \"Pudgy Penguins is a collection of non-fungible tokens (NFTs) that features 8,888 unique penguin avatars.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"7ee8a42c-7b77-4b6c-8522-628d71747e04\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"5c0d69af-ef97-44dc-b35d-461719fa2d12\", \"choices\": [{\"key\": \"A\", \"content\": \"Access to physical merchandise\"}, {\"key\": \"B\", \"content\": \"Access to unique digital backgrounds\"}, {\"key\": \"C\", \"content\": \"Exclusive perks and community events\"}, {\"key\": \"D\", \"content\": \"Discounts on future NFT purchases\"}], \"content\": \"What are the ownership perks of Pudgy Penguins NFTs?\", \"answerKeys\": [\"C\"], \"explanation\": \"Owners of Pudgy Penguins NFTs, known as ''The Huddle,'' enjoy exclusive perks and community events.\"}]}"}', 'pudgy-penguins', null);
INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('pudgy-penguins-mainstream', 'Entry into the Mainstream Market', 'Transition of Pudgy Penguins from Web3 to mainstream market', '2024-01-03T13:27:23.254Z', 'Live', '{}', '{}', 0, '{"{\"name\": \"Image Creation\", \"uuid\": \"ffc6125b-ee1a-42d3-a9e4-c20a7e1d81af\", \"content\": \"Pudgy Penguins created an appealing image with their adorable, meme-friendly penguin theme. This attracted a diverse audience, extending beyond the usual NFT community.\", \"stepItems\": []}","{\"name\": \"Fan Base Building\", \"uuid\": \"199cd04f-7c5c-4c6d-a4a6-dc856b5ada21\", \"content\": \"They established a large fan base through their active online presence, particularly on Instagram. They shared content that resonated with people, such as inspirational posts.\", \"stepItems\": []}","{\"name\": \"Introduction of Pudgy Toys\", \"uuid\": \"c65ec3c4-dd72-4148-beb5-1d5e5f227bfc\", \"content\": \"Their major breakthrough occurred when they began selling Pudgy Toys in renowned stores. This established a tangible connection between the online NFT world and regular shoppers.\", \"stepItems\": []}","{\"name\": \"Mainstream Success\", \"uuid\": \"7b63a42b-7133-4972-a11d-de8689b12368\", \"content\": \"This smart blend of strategies, coupled with their robust community engagement, facilitated Pudgy Penguins'' transition from a minor Web3 project to a prominent name in the mainstream market.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"a464cfe9-4876-4660-8e42-72cc6c9f4f30\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"b00ff13b-8024-4595-8c41-019c069eb5fe\", \"choices\": [{\"key\": \"A\", \"content\": \"Creating an appealing image with their adorable, meme-friendly penguin theme\"}, {\"key\": \"B\", \"content\": \"Building a large fan base through their active online presence\"}, {\"key\": \"C\", \"content\": \"Selling Pudgy Toys in renowned stores\"}, {\"key\": \"D\", \"content\": \"Engaging with their community\"}], \"content\": \"What strategy helped Pudgy Penguins establish a tangible connection between the online NFT world and regular shoppers?\", \"answerKeys\": [\"C\"], \"explanation\": \"Pudgy Penguins established a tangible connection between the online NFT world and regular shoppers by selling Pudgy Toys in renowned stores.\"}]}"}', 'pudgy-penguins', null);
INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('sustainable-nft-business-model', 'Sustainable Business Model', 'Sustainable NFT business model adopted by Pudgy Penguins', '2024-01-03T13:34:17.122Z', 'Live', '{}', '{}', 0, '{"{\"name\": \"Introduction\", \"uuid\": \"ed07c8b1-8e23-42da-afb5-a8cdb18d1ee0\", \"content\": \"Pudgy Penguins has taken up an enduring business approach by merging its digital NFT identity with the physical retail sector through the introduction of Pudgy Toys. This significant step adds a new layer to the NFT market, making it more reachable to a wider audience.\", \"stepItems\": []}","{\"name\": \"Digital Integration\", \"uuid\": \"1518ccbf-7c6f-47a7-8b7f-b3edf3d569e9\", \"content\": \"Every toy includes a special QR code that connects to Pudgy World, an online virtual world. This allows for a smooth switch between the physical toy and digital experiences.\", \"stepItems\": []}","{\"name\": \"Fighting Industry Challenges\", \"uuid\": \"3865b98b-a62a-4535-92eb-f8ddd84bbb87\", \"content\": \"By expanding beyond digital marketplaces, Pudgy Penguins'' varied sources of income tackle industry issues such as the devaluation caused by producing too many NFTs.\", \"stepItems\": []}","{\"name\": \"Economic Sustainability\", \"uuid\": \"4a17c82b-fcfd-4bdb-aa5e-4ed6f8fa25d0\", \"content\": \"Selling toys at Walmart generates income to pay for running expenses, providing a financially stable business approach.\", \"stepItems\": []}","{\"name\": \"Innovation and Engagement\", \"uuid\": \"43131448-404c-4b82-837f-898bb8e08226\", \"content\": \"This innovative approach not only maintains the brand''s relevance in the digital era but also sets new standards for brand co-ownership and consumer engagement.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"7ccb7880-2a89-40d4-aa5f-ef35017e99df\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"d0a2ee25-4da8-40ab-8ace-dc9cf9489b07\", \"choices\": [{\"key\": \"A\", \"content\": \"Selling clothes for children\"}, {\"key\": \"B\", \"content\": \"Creating a new online metaverse\"}, {\"key\": \"C\", \"content\": \"Integrating digital NFT presence with the physical retail market by selling toys\"}, {\"key\": \"D\", \"content\": \"Diversifying revenue streams\"}], \"content\": \"What is the sustainable business model adopted by Pudgy Penguins?\", \"answerKeys\": [\"C\"], \"explanation\": \"Pudgy Penguins has adopted a sustainable business model by integrating its digital NFT presence with the physical retail market, by launching its Pudgy Toys.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"1f0a7474-e948-4c74-b211-6f46d0f0e586\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"86f4730d-5357-44db-a0b8-58eae4bdf26d\", \"choices\": [{\"key\": \"A\", \"content\": \"By a unique QR code\"}, {\"key\": \"B\", \"content\": \"By a physical retail market presence\"}, {\"key\": \"C\", \"content\": \"By a digital NFT presence\"}, {\"key\": \"D\", \"content\": \"A Walmart partnership\"}], \"content\": \"How does each Pudgy Toy connect with Pudgy World come with?\", \"answerKeys\": [\"A\"], \"explanation\": \"Each Pudgy Toy comes with a unique QR code that links to Pudgy World, an online metaverse.\"}]}"}', 'pudgy-penguins', null);


INSERT INTO project_byte_collections (id, "projectId", created_at, updated_at, name, description, byte_ids, status, seo_meta) VALUES ('9437848e-d239-4853-b28e-87ede55b6170', 'pudgy-penguins', '2024-01-03 13:40:59.876', '2024-01-03 13:40:59.876', 'Pudgy Penguins Overview', 'A unique NFT collection which is popular in the mainstream market too', '{pudgy-penguins-nft,pudgy-penguins-mainstream,sustainable-nft-business-model}', 'DRAFT', null);


INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('gods-unchained-overview', 'About Gods Unchained', 'Overview of Gods Unchained and its development', '2023-12-21T13:53:10.397Z', 'Draft', '{}', '{}', 0, '{"{\"name\": \"Genesis\", \"uuid\": \"3238410d-7c24-44d9-b2df-a32248c78d36\", \"content\": \"Gods Unchained started its development in the summer of 2018. The first card set, Genesis, was released soon after, and a unique Mythic card, Hyperion, was auctioned for 146 ETH, equivalent to about $61,000 USD at the time.\", \"stepItems\": []}","{\"name\": \"Beta Launch\", \"uuid\": \"b58a3a7d-8e4a-4fe0-abd5-6f4a288bb11c\", \"content\": \"The Closed Beta version of the game was launched later in 2018, followed by an open beta in the summer of 2019.\", \"stepItems\": []}","{\"name\": \"Immutable X\", \"uuid\": \"d774d44d-476e-4412-be8f-349e0730553e\", \"content\": \"In 2019, the parent company of Gods Unchained was rebranded to Immutable. They started developing Immutable X, a layer 2 solution for Ethereum focusing on NFTs. This was due to high gas fees making the buying and selling of cards too expensive.\", \"stepItems\": []}","{\"name\": \"Marketplace\", \"uuid\": \"95b80a66-a745-46be-b5bc-4a2428c5d11a\", \"content\": \"The ImmutableX marketplace was launched in 2021. It currently serves as a gas-free trading hub for Gods Unchained cards and several other NFT projects.\", \"stepItems\": []}","{\"name\": \"Card Sets\", \"uuid\": \"a27ea2b0-1d31-4f84-8c71-c619ef2d0a6b\", \"content\": \"Gods Unchained released new card sets: Trial of the Gods (2020), Divine Order (2021), and Mortal Judgement (2022). The game includes a Welcome Set for all players and a Core set earned by playing matches and leveling up.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"c2108df6-852f-4384-b864-c56a66f82e60\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"3b96b177-131d-4edf-84c6-5e2d267d7fac\", \"choices\": [{\"key\": \"A\", \"content\": \"2018\"}, {\"key\": \"B\", \"content\": \"2019\"}, {\"key\": \"C\", \"content\": \"2020\"}, {\"key\": \"D\", \"content\": \"2021\"}], \"content\": \"When did Gods Unchained start its development?\", \"answerKeys\": [\"A\"], \"explanation\": \"Gods Unchained started its development in the summer of 2018.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"85413492-b230-4dd2-a800-166cb31dad41\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"e8f14af7-8d00-48dd-8bc8-2f2921b1a2c8\", \"choices\": [{\"key\": \"A\", \"content\": \"To develop additional card sets\"}, {\"key\": \"B\", \"content\": \"To provide a layer 2 solution for Ethereum focusing on NFTs\"}, {\"key\": \"C\", \"content\": \"To establish a strong presence in the blockchain space\"}, {\"key\": \"D\", \"content\": \"To serve as a gas-free trading hub for NFT projects\"}], \"content\": \"What is the purpose of Immutable X?\", \"answerKeys\": [\"B\"], \"explanation\": \"Immutable X is a layer 2 solution for Ethereum focusing on NFTs, developed to address high gas fees in buying and selling cards.\"}]}"}', 'gods-unchained', null);
INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('gods-unchained-gameplay', 'Gameplay Overview', 'Exploring the gameplay of Gods Unchained', '2023-12-21T14:06:17.913Z', 'Draft', '{}', '{}', 0, '{"{\"name\": \"Game Basics\", \"uuid\": \"e11ff352-e381-4e27-a4e9-3fcee7e54db0\", \"content\": \"Players use cards to summon creatures, cast spells, and equip relics. Cards can''t attack on the summoning turn, unless they have Blitz or Godblitz abilities. Some cards unlock extra mana locks or close opened locks.\", \"stepItems\": []}","{\"name\": \"Combat Mechanics\", \"uuid\": \"ac7fc8e3-de8b-4591-a865-4f22effdbaaf\", \"content\": \"Creatures can attack other Creatures or the gods themselves, unless an enemy Creature with the Frontline ability is in the way. Cards also feature other abilities such as Armor, Leech Life, Ward, and Hidden.\", \"stepItems\": []}","{\"name\": \"Void Interactions\", \"uuid\": \"54364342-7c90-484b-8768-fe7d5a126382\", \"content\": \"When creatures die or cards are used, they go into each player’s Void, unless they are Obliterated, in which case the card is completely removed from the game. Some cards can interact with the Void and bring cards back from the dead.\", \"stepItems\": []}","{\"name\": \"Time Management\", \"uuid\": \"2fe49344-a09d-46d6-a689-ef5c89f0d992\", \"content\": \"Players who don’t end their turn before the timer ends, receive a time penalty on their next turn. If a player runs out of cards to draw, they begin taking damage every time they should draw.\", \"stepItems\": []}","{\"name\": \"Sealed Mode\", \"uuid\": \"f5a3b636-6291-47f4-a0ad-909730d7b64a\", \"content\": \"Gods Unchained also offers Sealed mode for games. In this mode, players receive access to a semi-random selection of cards and must build a deck from these cards.\", \"stepItems\": []}","{\"name\": \"Sealed Mode Rewards\", \"uuid\": \"96097ea0-b321-4e9e-8a2d-9da61f00ca85\", \"content\": \"In Sealed mode, players aim for up to 7 wins before facing three losses. Entry requires GODS tokens, but successful matches can earn back the tokens and unlock limited-edition decorative items.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"5feae8db-f4af-4ef1-8c6d-a09fd4e98a63\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"7d1e6bdc-e89a-4ffb-8f81-104bb179440e\", \"choices\": [{\"key\": \"A\", \"content\": \"Buying items from a shop\"}, {\"key\": \"B\", \"content\": \"Using cards to summon creatures, cast spells, and equip relics\"}, {\"key\": \"C\", \"content\": \"Exploring different worlds\"}, {\"key\": \"D\", \"content\": \"Solving puzzles\"}], \"content\": \"What is the gameplay of Gods Unchained?\", \"answerKeys\": [\"B\"], \"explanation\": \"The gameplay of Gods Unchained involves using cards to summon creatures, cast spells, and equip relics.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"87745179-192c-4b1e-bc53-4af93f2f810e\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"0bd9905b-3edf-4027-a2eb-30bdd7fd1767\", \"choices\": [{\"key\": \"A\", \"content\": \"They lose the game\"}, {\"key\": \"B\", \"content\": \"They draw cards from their opponent''s deck\"}, {\"key\": \"C\", \"content\": \"They skip their turn\"}, {\"key\": \"D\", \"content\": \"They start taking damage\"}], \"content\": \"What happens when a player runs out of cards to draw in Gods Unchained?\", \"answerKeys\": [\"D\"], \"explanation\": \"When a player runs out of cards to draw, they begin taking damage every time they should draw.\"}]}"}', 'gods-unchained', null);
INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('gods-unchained-nfts', 'Gods Unchained NFTs', 'Overview of Gods Unchained NFTs', '2024-01-01T14:08:55.298Z', 'Live', '{}', '{}', 0, '{"{\"name\": \"NFTs\", \"uuid\": \"5378c412-c836-4efe-a10b-0e93cf066526\", \"content\": \"Gods Unchained is a game where players can win cards or card packs by winning battles, completing daily quests and other types of challenges. These cards are ownable NFT assets, allowing gamers to expand their collection.\", \"stepItems\": []}","{\"name\": \"Cosmetics\", \"uuid\": \"bbacfff0-c1bf-44ae-854d-5ce7bb845c9f\", \"content\": \"The game also includes items known as cosmetics. These items allow players to have a different card decoration, game board, or other types of visual upgrades, adding a unique touch to their gaming experience.\", \"stepItems\": []}","{\"name\": \"Secondary Marketplace\", \"uuid\": \"965539a0-a65d-45de-a543-a13d18aaee6c\", \"content\": \"Cosmetics can be found on the secondary marketplace, where players can buy or sell these items. This adds another layer of engagement to the game, as players can trade items to customize their gaming experience.\", \"stepItems\": []}","{\"name\": \"Events and Prizes\", \"uuid\": \"7d18f55f-0406-4c05-9dea-90ca7916bdb2\", \"content\": \"Additionally, special events or tournaments often offer cosmetics as prizes. This provides players with an incentive to participate and compete, as they can win unique items to enhance their game.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"e514cff5-856c-4285-a4f7-4bd0eafd806d\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"d6239ff2-9fd9-4b9c-855b-80631b5c3c9c\", \"choices\": [{\"key\": \"A\", \"content\": \"Cards or card packs that players can win by winning battles, completing daily quests, and other challenges\"}, {\"key\": \"B\", \"content\": \"Items that players can buy from a shop\"}, {\"key\": \"C\", \"content\": \"Items that decrease in value over time\"}, {\"key\": \"D\", \"content\": \"Items that players buy for fun\"}], \"content\": \"What are Gods Unchained NFTs?\", \"answerKeys\": [\"A\"], \"explanation\": \"Gods Unchained NFTs are ownable assets in the form of cards or card packs that players can win by winning battles, completing daily quests, and other challenges.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"0393c5c8-48b6-4749-85be-f4f00aa6617d\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"1846a9f0-c0a8-4ac2-bbb1-67663665d746\", \"choices\": [{\"key\": \"A\", \"content\": \"In the in-game shop\"}, {\"key\": \"B\", \"content\": \"On the secondary marketplace\"}, {\"key\": \"C\", \"content\": \"As prizes in special events or tournaments\"}, {\"key\": \"D\", \"content\": \"By completing daily quests\"}], \"content\": \"Where can players find cosmetics in Gods Unchained?\", \"answerKeys\": [\"B\"], \"explanation\": \"Cosmetics can be found on the secondary marketplace, where players can buy or sell these items.\"}]}"}', 'gods-unchained', null);
INSERT INTO project_bytes (id, name, content, created, publish_status, admins, tags, priority, steps, space_id, seo_meta) VALUES ('gods-utility-tokenomics', '$GODS Utility & Tokenomics', 'Understanding the utility and tokenomics of $GODS', '2024-01-01T14:18:02.003Z', 'Live', '{}', '{}', 0, '{"{\"name\": \"Token Allocation\", \"uuid\": \"8fb5eb5e-b548-4c59-a1f9-cdaf2b12658d\", \"content\": \"The $GODS token has a total supply of 500 million, with over 34% allocated to play-to-earn rewards. This pool covers weekend ranked rewards, daily tokens, quests, seasonal rewards, tournaments, and special game modes to attract players to Gods Unchained.\", \"stepItems\": []}","{\"name\": \"Community Engagement\", \"uuid\": \"b44d437d-c183-47dc-a6aa-8094b2178c23\", \"content\": \"102.5 million $GODS (20.5%) are allocated to the community for engagement initiatives like community tournaments, activations, content creators, partnerships, referral rewards, and liquidity mining.\", \"stepItems\": []}","{\"name\": \"Public Token Sale\", \"uuid\": \"937c0e2d-a074-4bc4-b2b9-4441432a73ca\", \"content\": \"35,000,000 tokens (7%) were set aside for a public token sale. At the time of writing, the $GODS token is available on many major crypto exchanges, including Coinbase.\", \"stepItems\": []}","{\"name\": \"Token Distribution\", \"uuid\": \"10f22a65-fcf2-401c-9a6a-aa10fedda468\", \"content\": \"The remaining 25% of in-game currency is distributed to God''s Unchained reserve (25%), community allocation (7%), and token foundation (6.50%). The full token supply is set to vest by November 20, 2027.\", \"stepItems\": []}","{\"name\": \"Future Utility\", \"uuid\": \"b13fe690-cd2f-43a5-9cd7-f9f99c5c60ef\", \"content\": \"$GODS token utility is expanding, allowing fusion of in-game cards to create NFTs on ImmutableX. These NFTs can be used in-game or traded on the ImmutableX Marketplace with gas-free and instant trade confirmation features.\", \"stepItems\": []}","{\"name\": \"Evaluation\", \"uuid\": \"1ca409e4-14e5-4d23-b223-0ec39a768444\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"37e07c14-3925-4dc3-b921-ae7678fa4911\", \"choices\": [{\"key\": \"A\", \"content\": \"34%\"}, {\"key\": \"B\", \"content\": \"20.5%\"}, {\"key\": \"C\", \"content\": \"7%\"}, {\"key\": \"D\", \"content\": \"6.50%\"}], \"content\": \"What percentage of the $GODS token is allocated to the play-to-earn rewards pool?\", \"answerKeys\": [\"A\"], \"explanation\": \"Over 34% of the $GODS token is allocated to the play-to-earn rewards pool. This pool includes weekend ranked rewards, daily token rewards, quests, seasonal rewards, tournaments, and special game modes.\"}]}","{\"name\": \"Evaluation\", \"uuid\": \"851f90c9-3398-455e-84b9-f7291df7029d\", \"content\": \"\", \"stepItems\": [{\"type\": \"SingleChoice\", \"uuid\": \"4580020c-27c1-405c-b4ee-f5bd46de146b\", \"choices\": [{\"key\": \"A\", \"content\": \"From the game developers\"}, {\"key\": \"B\", \"content\": \"On major crypto exchanges\"}, {\"key\": \"C\", \"content\": \"From a physical store\"}, {\"key\": \"D\", \"content\": \"From the game''s website\"}], \"content\": \"Where can the $GODS token be purchased?\", \"answerKeys\": [\"B\"], \"explanation\": \"The $GODS token can be purchased on many major crypto exchanges, including Coinbase, where it is priced at $0.34 per token.\"}]}"}', 'gods-unchained', null);

INSERT INTO project_byte_collections (id, "projectId", created_at, updated_at, name, description, byte_ids, status, seo_meta) VALUES ('e6be12e9-ceb7-4940-9cd5-71abed0cfdf9', 'gods-unchained', '2024-01-01 14:30:33.411', '2024-01-01 14:30:33.411', 'Introduction to Gods Unchained', 'This tidbit collection provides a comprehensive understanding of Gods Unchained and its gameplay.', '{gods-unchained-overview,gods-unchained-gameplay}', 'DRAFT', null);
INSERT INTO project_byte_collections (id, "projectId", created_at, updated_at, name, description, byte_ids, status, seo_meta) VALUES ('2d2b1e2e-4880-4f27-ba50-941ec5d208d9', 'gods-unchained', '2024-01-02 14:13:06.778', '2024-01-02 14:13:06.778', 'Tokenomics & NFTs', 'This tidbit collection discusses about the on-chain token and NFTs of Gods Unchained.', '{gods-utility-tokenomics,gods-unchained-nfts}', 'DRAFT', null);


INSERT INTO project_short_videos (id, project_id, priority, created_at, updated_at, title, description, video_url, thumbnail, seo_meta) VALUES ('9505fa6d-097b-456e-9401-497efca8a4a9', 'gods-unchained', 100, '2024-01-02 14:18:32.515', '2024-01-02 14:19:13.029', 'About Gods Unchained', 'About Gods Unchained', 'https://d31h13bdjwgzxs.cloudfront.net/academy/top-crypto-projects/ShortVideo/1acfeb7b_cc5c_4935_9948_bcd7097e5758/1704205069314_videoplayback_%283%29.mp4', 'https://d31h13bdjwgzxs.cloudfront.net/academy/top-crypto-projects/ShortVideo/9505fa6d_097b_456e_9401_497efca8a4a9/1704205143149_screenshot_2024-01-02%20191722.png', null);
INSERT INTO project_short_videos (id, project_id, priority, created_at, updated_at, title, description, video_url, thumbnail, seo_meta) VALUES ('95666f90-c030-42d6-abcf-4df0c7f4de38', 'gods-unchained', 80, '2024-01-02 14:22:33.398', '2024-01-02 14:22:33.398', 'Gods Unchained Available On Amazon Prime', 'Gods Unchained Available On Amazon Prime', 'https://d31h13bdjwgzxs.cloudfront.net/academy/top-crypto-projects/ShortVideo/574a6379_0975_46f3_8671_1bd6f3700e56/1704205282432_videoplayback_%284%29.mp4', 'https://d31h13bdjwgzxs.cloudfront.net/academy/top-crypto-projects/ShortVideo/574a6379_0975_46f3_8671_1bd6f3700e56/1704205279630_screenshot_2024-01-02%20192034.png', null);


INSERT INTO spaces
(id, settings, verified, created_at, creator, name, updated_at, avatar, admins, admin_usernames, domains, skin, discord_invite, telegram_invite, invite_links, auth_settings, guide_settings, social_settings, byte_settings, features, "botDomains", theme_colors, admin_usernames_v1, type)
VALUES
('test-tidbits',
'{
    "id": "test-tidbits",
    "admins": [],
    "adminUsernames": [],
    "adminUsernamesV1": [
        {
            "username": "support@dodao.io",
            "nameOfTheUser": "support@dodao.io"
        },
        {
            "username": "0xB0Bc2970c3A870E7E3383357AA98770Fc8eAE3F1",
            "nameOfTheUser": "Sami"
        }
    ],
    "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/dodao-academy/AcademyLogo/dodao_academy/1691168329774_dodao_logo%2Btext%20rectangle.svg",
    "creator": "support@dodao.io",
    "features": [],
    "name": "Test Tidbits",
    "skin": "dodao",
    "type": "TidbitsSite",
    "inviteLinks": {
        "discordInviteLink": null,
        "showAnimatedButtonForDiscord": null,
        "telegramInviteLink": null,
        "showAnimatedButtonForTelegram": null
    },
    "spaceIntegrations": {
        "discordGuildId": null,
        "projectGalaxyTokenLastFour": null,
        "gnosisSafeWallets": [],
        "gitGuideRepositories": [],
        "academyRepository": null
    },
    "domains": [
        "test-tidbits.tidbitshub.org",
        "test-tidbits.tidbitshub-localhost.org"
    ],
    "botDomains": []
}'::json,
true,
'2024-03-22 09:53:06.936',
'support@dodao.io',
'Test Tidbits',
'2024-03-22 13:04:01.099',
'https://d31h13bdjwgzxs.cloudfront.net/academy/dodao-academy/AcademyLogo/dodao_academy/1691168329774_dodao_logo%2Btext%20rectangle.svg',
ARRAY[]::text[],
ARRAY[]::varchar(255)[],
ARRAY['test-tidbits.tidbitshub.org','test-tidbits.tidbitshub-localhost.org'],
'dodao',
NULL,
NULL,
'{
    "discordInviteLink": null,
    "showAnimatedButtonForDiscord": null,
    "telegramInviteLink": null,
    "showAnimatedButtonForTelegram": null
}'::json,
'{}'::json,
'{}'::json,
'{}'::json,
'{}'::json,
ARRAY[]::text[],
ARRAY[]::text[],
'{
    "primaryColor": "#88b98e",
    "bgColor": "#4d5650",
    "textColor": "#cbd3dc",
    "linkColor": "#f0f0f5",
    "headingColor": "#dfe1e7",
    "borderColor": "#d0d7de",
    "blockBg": "#122e59"
}'::json,
ARRAY[
    '{"username": "support@dodao.io", "nameOfTheUser": "support@dodao.io"}',
    '{"username": "0xB0Bc2970c3A870E7E3383357AA98770Fc8eAE3F1", "nameOfTheUser": "Sami"}'
]::jsonb[],
'TidbitsSite'
);


INSERT INTO space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository, "loadersInfo") VALUES ('51857152-b9d8-4675-8461-052bfe258000', 'test-tidbits', '2024-03-21 15:07:50.904', null, null, null, null, '2024-03-22 09:53:06.945', 'clhqrymsy0006s9awkhi9o7k6', '[]', '{}', null, null);
