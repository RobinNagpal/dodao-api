create table spaces
(
    id              varchar(64)                                     not null
        primary key,
    settings        json,
    verified        integer      default 0                          not null,
    created_at      timestamp(3) default CURRENT_TIMESTAMP          not null,
    creator         varchar(64)                                     not null,
    name            varchar(255)                                    not null,
    updated_at      timestamp(3)                                    not null,
    avatar          varchar(255),
    admins          text[],
    skin            varchar(128) default 'dodao'::character varying not null,
    discord_invite  varchar(1024),
    telegram_invite varchar(1024),
    invite_links    json,
    features        text[]
);

create table academy_tasks
(
    uuid                 varchar(66)                            not null
        primary key,
    created_at           timestamp(3) default CURRENT_TIMESTAMP not null,
    created_by           varchar(128)                           not null,
    prerequisite_courses jsonb                                  not null,
    prerequisite_guides  jsonb                                  not null,
    space_id             varchar(64)                            not null,
    status               varchar(64)                            not null,
    details              text                                   not null,
    title                varchar(66)                            not null,
    items                jsonb                                  not null,
    updated_at           timestamp(3)                           not null,
    updated_by           varchar(128)                           not null,
    excerpt              varchar(256)                           not null
);


create table byte_submissions
(
    id         varchar(66)                            not null
        primary key,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    created_by varchar(64)                            not null,
    byte_id    varchar(64)                            not null,
    space_id   varchar(64)                            not null,
    steps      jsonb                                  not null
);


create table git_course_submissions
(
    uuid                       varchar(66)                                          not null
        primary key,
    course_key                 varchar(128)                                         not null,
    created_at                 timestamp(3) default CURRENT_TIMESTAMP               not null,
    created_by                 varchar(64)                                          not null,
    is_latest_submission       boolean                                              not null,
    questions_attempted        integer,
    questions_correct          integer,
    questions_incorrect        integer,
    questions_skipped          integer,
    space_id                   varchar(64)                                          not null,
    updated_at                 timestamp(3)                                         not null,
    status                     varchar(64)  default 'InProgress'::character varying not null,
    galaxy_credentials_updated boolean
);


create table git_course_topic_submissions
(
    uuid                   varchar(66)                                          not null
        primary key,
    course_key             varchar(128)                                         not null,
    course_submission_uuid varchar(66)                                          not null
        references git_course_submissions
            on update cascade on delete restrict,
    created_at             timestamp(3) default CURRENT_TIMESTAMP               not null,
    created_by             varchar(64)                                          not null,
    is_latest_submission   boolean                                              not null,
    questions_attempted    integer,
    questions_correct      integer,
    questions_incorrect    integer,
    questions_skipped      integer,
    submission             json                                                 not null,
    space_id               varchar(64)                                          not null,
    topic_key              varchar(128)                                         not null,
    updated_at             timestamp(3)                                         not null,
    status                 varchar(64)  default 'InProgress'::character varying not null,
    correct_answers        jsonb
);


create table guides
(
    id                           varchar(66)                                          not null
        primary key,
    content                      text                                                 not null,
    previous_id                  varchar(66),
    uuid                         varchar(255)                                         not null,
    authors                      jsonb                                                not null,
    created                      integer                                              not null,
    space_id                     varchar(64)                                          not null,
    guide_name                   varchar(255)                                         not null,
    guide_source                 varchar(255)                                         not null,
    status                       varchar(255)                                         not null,
    version                      integer                                              not null,
    thumbnail                    varchar(255),
    categories                   jsonb                                                not null,
    discord_webhook              varchar(1024),
    guide_type                   varchar(128) default 'onboarding'::character varying not null,
    publish_status               varchar(128) default 'Live'::character varying       not null,
    social_share_image           varchar(2048),
    discord_role_ids             jsonb                                                not null,
    discord_role_passing_count   integer,
    show_incorrect_on_completion boolean      default true                            not null,
    post_submission_step_content text                                                 not null
);





create table course_integrations
(
    id                                varchar(255)                           not null
        primary key,
    space_id                          varchar(255)                           not null
        references spaces
            on update cascade on delete restrict,
    course_key                        varchar(255)                           not null,
    created_at                        timestamp(3) default CURRENT_TIMESTAMP not null,
    created_by                        varchar(256),
    discord_role_ids                  json,
    discord_role_passing_count        integer,
    discord_webhook                   varchar(1024),
    project_galaxy_credential_id      varchar(255),
    project_galaxy_oat_mint_url       varchar(255),
    project_galaxy_oat_passing_count  integer,
    updated_at                        timestamp(3)                           not null,
    updated_by                        varchar(256),
    project_galaxy_oat_minted_content text
);


create unique index course_integrations_space_id_course_key_key
    on course_integrations (space_id, course_key);

create table git_courses
(
    id              varchar(255)                                   not null
        primary key,
    course_key      varchar(255)                                   not null,
    space_id        varchar(66)                                    not null
        references spaces
            on update cascade on delete restrict,
    created_at      timestamp(3) default CURRENT_TIMESTAMP         not null,
    created_by      varchar(256),
    course_json_url varchar(1024),
    weight          integer      default 20                        not null,
    updated_at      timestamp(3)                                   not null,
    updated_by      varchar(256),
    course_repo_url varchar(1024),
    publish_status  varchar(128) default 'Live'::character varying not null,
    course_admins   json                                           not null
);


create unique index git_courses_space_id_course_key_key
    on git_courses (space_id, course_key);

create table guide_integrations
(
    id                               varchar(255)                           not null
        primary key,
    space_id                         varchar(255)                           not null
        references spaces
            on update cascade on delete restrict,
    guide_id                         varchar(255)                           not null,
    created_at                       timestamp(3) default CURRENT_TIMESTAMP not null,
    created_by                       varchar(256),
    discord_role_ids                 json,
    discord_role_passing_count       integer,
    discord_webhook                  varchar(1024),
    project_galaxy_credential_id     varchar(255),
    project_galaxy_oat_mint_url      varchar(255),
    updated_at                       timestamp(3)                           not null,
    updated_by                       varchar(256),
    project_galaxy_oat_passing_count integer
);


create table guide_steps
(
    id         varchar(66)                            not null
        primary key,
    uuid       varchar(66)                            not null,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    step_name  varchar(255)                           not null,
    content    text                                   not null,
    step_items json                                   not null,
    step_order integer                                not null,
    space_id   varchar(64)                            not null
        references spaces
            on update cascade on delete restrict
);

create table guide_submissions
(
    id         varchar(66)                            not null
        primary key,
    created_at timestamp(3) default CURRENT_TIMESTAMP not null,
    created_by varchar(64)                            not null,
    guide_id   varchar(64)                            not null,
    guide_uuid varchar(255)                           not null,
    result     json                                   not null,
    space_id   varchar(64)                            not null
        references spaces
            on update cascade on delete restrict,
    steps      json                                   not null,
    uuid       varchar(255)                           not null
);


create table guides_guide_steps
(
    id            varchar(255)                           not null
        primary key,
    guide_step_id varchar(66)                            not null,
    guide_id      varchar(66)                            not null,
    created_at    timestamp(3) default CURRENT_TIMESTAMP not null,
    space_id      varchar(64)                            not null
        references spaces
            on update cascade on delete restrict
);


create table space_discords
(
    id                  varchar(255)                           not null
        primary key,
    access_token        varchar(255)                           not null,
    access_token_expiry integer                                not null,
    created_at          timestamp(3) default CURRENT_TIMESTAMP not null,
    refresh_token       varchar(255)                           not null,
    selected_guide_id   varchar(255),
    space_id            varchar(66)                            not null
        references spaces
            on update cascade on delete restrict,
    updated_at          timestamp(3)                           not null
);


create table space_integrations
(
    id                             varchar(255)                           not null
        primary key,
    space_id                       varchar(66)                            not null
        references spaces
            on update cascade on delete restrict,
    created_at                     timestamp(3) default CURRENT_TIMESTAMP not null,
    created_by                     varchar(256),
    discord_guild_id               varchar(255),
    project_galaxy_token           varchar(256),
    project_galaxy_token_last_four varchar(64),
    updated_at                     timestamp(3)                           not null,
    updated_by                     varchar(256),
    gnosis_safe_wallets            json,
    git_guide_repositories         json[],
    academy_repository             varchar(2048)
);


create unique index space_integrations_space_id_key
    on space_integrations (space_id);



insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'Aave', 'aave-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "Aave", "skin": "aave", "about": "Aave is a decentralized non-custodial liquidity market protocol where users can participate as depositors or borrowers.", "admins": [], "avatar": "ipfs://QmTr7YXEpahqAEL2nj752MZFPPibgHNZiwrGNu3givhtR3", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Earn interest, borrow assets, and build applications", "network": "1", "twitter": "aaveaave", "blockchain": "ETH", "categories": ["protocol", "grant"], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmTr7YXEpahqAEL2nj752MZFPPibgHNZiwrGNu3givhtR3', 'aave', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'Unstoppable Academy', 'unstoppable-academy-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "Unstoppable Academy", "skin": "unstoppable", "admins": [], "avatar": "ipfs://QmaFtT8WkXaaEZaBWePzCBXMYGHd4nZapBrTx9Y7QFQvEi", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Help everyone own their identity in the digital world", "network": "1", "twitter": "unstoppableweb", "blockchain": "ETH", "categories": ["protocol"], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmaFtT8WkXaaEZaBWePzCBXMYGHd4nZapBrTx9Y7QFQvEi', 'unstoppable', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'Balancer', 'balancer-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "Balancer", "skin": "balancer", "about": "Balancer is a community-driven protocol, automated portfolio manager, liquidity provider, and price sensor that empowers decentralized exchange and the automated portfolio management of tokens on the Ethereum blockchain and other EVM compatible systems.", "admins": ["0xF557C535Dab891C6c8e3ac5B52E5dcA23D4EA029", "0xdanko.eth", "0x34d014758297c00fea49935fce172677904d51ef"], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/balancer/balancer-bal-logo.png", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "An automated portfolio manager and trading platform for everyone", "network": "1", "twitter": "BalancerLabs", "blockchain": "ETH", "categories": ["protocol"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/academy/balancer/balancer-bal-logo.png', 'balancer', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'bio.xyz', 'bioxyz-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "bio.xyz", "skin": "bioxyz", "admins": ["0x8BFa8D460684C531BfCBEdEb157Ee72517a29239"], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/bioxyz/bio.xyz+Icon.png", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Build biotech DAOs and DeSci projects of the future", "network": "1", "blockchain": "ETH", "categories": ["social"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/academy/bioxyz/bio.xyz+Icon.png', 'bioxyz', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'COMPOUND', 'compound-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "COMPOUND", "skin": "compound", "about": "Compound is a protocol on the Ethereum blockchain that establishes money markets, which are pools of assets with algorithmically derived interest rates, based on the supply and demand for the asset.", "admins": [], "avatar": "ipfs://QmVh2xNZ6Z9k2M5GPqHw9V9VdAatuTN4QyvQnhroaY8KF2", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "An algorithmic, autonomous interest rate protocol built for all", "network": "1", "twitter": "compoundfinance", "blockchain": "ETH", "categories": ["protocol"], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmVh2xNZ6Z9k2M5GPqHw9V9VdAatuTN4QyvQnhroaY8KF2', 'compound', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'DAOCubator', 'daocubator-near-mainnet', 'robinnagpal.near', '{"name": "DAOCubator", "skin": "daocubator", "about": "DAOcubator is the incubator for modern day organizations built on Web 3.0 technology and practices decentralized governance.\\n", "admins": ["kitbuti.near"], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg", "creator": "robinnagpal.near", "members": [], "mission": "DAOcubator is all about incubators, it has funds for incubators ", "network": "mainnet", "blockchain": "NEAR", "categories": ["grant", "social"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg', 'daocubator', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'DoDAO', 'dodao-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "DoDAO", "skin": "dodao", "about": "We believe that DAOs will play a major role in Social Good. Our mission is to have at least ONE million DAOs by 2025 and make DAOs accessible to mass public.", "admins": [], "avatar": "ipfs://QmfDoQKTFNdzWunFW5k1QioAEyEuGtysswxFnAiuTwq2V9", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Helps DAO to onboard members and increase participation", "network": "1", "twitter": "dodao_io", "blockchain": "ETH", "categories": ["protocol", "social"], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmfDoQKTFNdzWunFW5k1QioAEyEuGtysswxFnAiuTwq2V9', 'dodao', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'DoDAO Academy', 'dodao-academy-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "DoDAO Academy", "skin": "dodao", "admins": ["0x34d014758297c00fea49935fce172677904d51ef", "0x3F41520c4A7C578644d5E5256c1E040e863bD662", "0x47a67e14b3804dC652b3A3200D8c00D4F55aBB6b", "0x003B5be2ffc0A5502D91567Ae2E75AD9F2c11259"], "avatar": "ipfs://QmWy8EeMnxqx96VEPx2NBwzqtKxvMQqVVYvmPKgAYS2cUi", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Educate people for free and onboard them to web3", "network": "1", "twitter": "dodao_io", "blockchain": "ETH", "categories": ["creator", "media"], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmWy8EeMnxqx96VEPx2NBwzqtKxvMQqVVYvmPKgAYS2cUi', 'dodao', null, null, '{"discordInviteLink": "https://discord.gg/BMGVWkbFDW", "showAnimatedButtonForDiscord": true}', array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'ENS Domains', 'ens-domains-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "ENS Domains", "skin": "dodao", "admins": [], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/logos/ETH/ENS/ens_logo.png", "github": "ensdomains", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Decentralized naming for wallets, websites, & more.", "network": "1", "twitter": "ensdomains", "blockchain": "ETH", "categories": ["protocol", "social"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/logos/ETH/ENS/ens_logo.png', 'dodao', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'Grindery', 'grindery-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "Grindery", "skin": "balancer", "admins": ["0xb33cB5D3ceD2A477A6C80910c2962De697dbbe48", "0x2c0015A367eb73f575e48F9dC46dE0b8e497EAAC", "0x5879C017729336B3Cfb6Da7df90BB712640f49dC"], "avatar": "ipfs://QmWmDYragsqFKsV5kBTNvkUX7PJzjNS9t3EmfvAi5cPVYb", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Zapier for Web3", "network": "1", "blockchain": "ETH", "categories": [], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmWmDYragsqFKsV5kBTNvkUX7PJzjNS9t3EmfvAi5cPVYb', 'balancer', null, null, '{"discordInviteLink": "https://discord.gg/PCMTWg3KzE", "showAnimatedButtonForDiscord": true}', array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'Uniswap', 'uniswap-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "Uniswap", "skin": "uniswap", "about": "Developers, traders, and liquidity providers participate together in a financial marketplace that is open and accessible to all.", "admins": [], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/uniswap/uniswap_icon.svg", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Swap, earn and build on a decentralized crypto trading protocol", "network": "1", "twitter": "Uniswap", "blockchain": "ETH", "categories": ["protocol"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/academy/uniswap/uniswap_icon.svg', 'uniswap', null, null, null, array[]::text[]);


insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'Kleros', 'kleros-eth-1', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "Kleros", "skin": "kleros", "about": "Kleros is a decentralized dispute resolution protocol for use on smart contract platforms, which has been implemented on Ethereum.\\nIt acts as a decentralized third party capable of providing decisions on the correct result when applying a set of rules to questions ranging from simple to highly complex.\\nThis is achieved by using game-theoretic incentives to have crowdsourced jurors analyze and rule on cases correctly. Hence, Kleros provides judgments in an inexpensive, reliable, typically fast, and decentralized way. Of particular relevance is the use of this protocol to dispute resolution, creating a form of decentralized justice.", "admins": ["0x25F73d547c8A847eB0aC99AF0cBA5399D027f070", "0xFdc78b748d6Bc5f780C2f6654ca73426a0D3b387", "0xA66D38D132461f69b5aA1958233Ee120f513D451", "0x9d9E26932d012b2Ab21B974fE1552F4025b1e1Cc", "0x6687c671980E65ebD722b9146Fc61e2471558dd6", "0xf313d85c7fEF79118fCD70498c71BF94E75Fc2F6", "0xAE06AC0D353329ccCAdc2Fd978042591447C3De2", "0x8Bc9AaaDB3DbccE71eF9F67B803BfFC3ff3906F9", "0xe7d5313ef18D8cBAE8D155a8368b8cbDF7080118", "0xca4050258754E0D5ABaE5EC956E7918EC6724489", "0xf12C67e80E309eaC0c4dc18Fb26e68F9672297E9", "0x1f5FeD81499875bB1D19aA82e8DA822E7117ef2F", "0x613839B547aA2b417FE9F6B174Ed4542Cac338c8"], "avatar": "ipfs://QmdnS6QTJ2njj5swrox8tPxCFFHoWMvDGWqZfjzAtMzLT6", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Decentralized dispute resolution protocol", "network": "1", "twitter": "kleros_io", "blockchain": "ETH", "categories": ["protocol", "social"], "validation": {"name": "basic", "params": {}}}', 0, 'ipfs://QmdnS6QTJ2njj5swrox8tPxCFFHoWMvDGWqZfjzAtMzLT6', 'kleros', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'The NDC', 'ndc-near-mainnet', 'robinnagpal.near', '{"name": "NDC", "skin": "daocubator", "admins": ["blaze.near", "sahilmassey.near", "matth.near", "wonz.near"], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg", "creator": "robinnagpal.near", "members": [], "mission": "Decentralize NEAR’s ecosystem governance and move decision-maki", "network": "mainnet", "blockchain": "NEAR", "categories": ["social"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg', 'daocubator', null, null, null, array[]::text[]);
insert into spaces (created_at, updated_at, name, id, creator, settings, verified, avatar, skin, discord_invite, telegram_invite, invite_links, features) values (now(), now(), 'The Test Academy', 'test-academy-eth', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', '{"name": "The Test Academy", "skin": "daocubator", "admins": [], "avatar": "https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg", "creator": "0x470579d16401a36BF63b1428eaA7189FBdE5Fee9", "members": [], "mission": "Test it out", "network": "mainnet", "blockchain": "ETH", "categories": ["social"], "validation": {"name": "basic", "params": {}}}', 0, 'https://d31h13bdjwgzxs.cloudfront.net/academy/daocubator/daocubator_logo.jpg', 'daocubator', null, null, null, array[]::text[]);



insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('1682dc46-c969-49f8-b9e2-b3f0d1c1dcc5', 'grindery-eth-1', '2023-05-06 23:46:20.976', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:20.976', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/grindery-guides"}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('2ab75ad9-fb5c-4766-9084-a407c456ff19', 'aave-eth-1', '2023-05-06 23:46:21.106', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.106', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-aave-guides", "gitRepoType": null, "authenticationToken": null}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('3ba09c31-a73e-4976-a889-0a75588e4fff', 'unstoppable-academy-eth-1', '2023-05-06 23:46:21.219', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.219', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-unstoppable-guides", "gitRepoType": null, "authenticationToken": null}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('4b9cc48c-0ba5-4633-beb1-d4df8875f185', 'uniswap-eth-1', '2023-05-06 23:46:21.339', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.339', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[]'::json], 'https://github.com/DoDAO-io/uniswap-lp-academy');
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('4d0edec0-c0fb-4e64-8f68-7270748534c8', 'balancer-eth-1', '2023-05-06 23:46:21.453', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.453', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-balancer-guides", "gitRepoType": null, "authenticationToken": null}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('58e0ebdd-c797-4e7e-89f9-90b64ef719c6', 'bioxyz-eth-1', '2023-05-06 23:46:21.575', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.575', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/bio-xyz-guides"}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('68e7a413-08a2-4d17-b3b7-9cb4e369d8ea', 'compound-eth-1', '2023-05-06 23:46:21.691', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.691', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/compound-academy-guides"}]'::json], 'https://github.com/DoDAO-io/compound-finance-academy');
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('9d573a87-1cba-43bb-a5a4-502e60938d9a', 'ens-domains-eth-1', '2023-05-06 23:46:22.021', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:22.021', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-ens-guides", "gitRepoType": null, "authenticationToken": null}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('c4b53f4c-e1e1-417a-b463-74d8facdc2cd', 'dodao-academy-eth-1', '2023-05-06 23:46:22.235', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, '14Jnlu9SliZPpsFeI8UO9j0UoEkB5oN2', '5oN2', '2023-05-06 23:46:22.235', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-academy-guides", "gitRepoType": null, "authenticationToken": null}]'::json], 'https://github.com/DoDAO-io/dodao-academy');
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('d6ec8599-ecdd-4e46-9df5-bd105ca793df', 'dodao-1', '2023-05-06 23:46:22.344', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:22.344', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-guides", "gitRepoType": null, "authenticationToken": null}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('faf33e36-1a38-48af-be71-c9eac3f7539d', 'daocubator-near-mainnet', '2023-05-06 23:46:22.455', 'robinnagpal.near', null, null, null, '2023-05-06 23:46:22.455', 'robinnagpal.near', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/dodao-daocubator-guides", "gitRepoType": null, "authenticationToken": null}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('6f3a8dcd-6da4-4bea-9b3b-b19b755efca2', 'kleros-eth-1', '2023-05-06 23:46:21.802', '0x25F73d547c8A847eB0aC99AF0cBA5399D027f070', null, '6woLfUMNkjql1HHDyv9rdixR4S9TS7aQ', 'S7aQ', '2023-05-06 23:46:21.802', '0x25F73d547c8A847eB0aC99AF0cBA5399D027f070', null, ARRAY []::json[], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('bc1e8108-eec9-4fa2-90b8-a6f1548c3974', 'ndc-near-mainnet', '2023-05-06 23:46:22.126', 'robinnagpal.near', null, null, null, '2023-05-06 23:46:22.126', 'robinnagpal.near', null, ARRAY ['[{"repoUrl": "https://github.com/DoDAO-io/ndc-guides"}]'::json], null);
insert into space_integrations (id, space_id, created_at, created_by, discord_guild_id, project_galaxy_token, project_galaxy_token_last_four, updated_at, updated_by, gnosis_safe_wallets, git_guide_repositories, academy_repository) values ('68e7a413-08a2-4d17-b3b7-9cb4e259d8ea', 'test-academy-eth', '2023-05-06 23:46:21.691', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, null, null, '2023-05-06 23:46:21.691', '0x470579d16401a36BF63b1428eaA7189FBdE5Fee9', null, ARRAY ['[]'::json], 'https://github.com/DoDAO-io/test-academy');
