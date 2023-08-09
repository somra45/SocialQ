const User = require('../models/User');
const Tweet = require('../models/Tweet');

const createCherTweets = async () => {
    const cherUser = await User.findOne({ firstName: 'Cher', lastName: 'Sarkissian' });

    const cherTweets = [
        new Tweet({
            author: cherUser._id,
            body: `I’M SO +%#~>€ EXCITED ABOUT MY 🎅🏼🎄ALBUM. NEVER WANTED 2 DO ONE, BUT ITS AS GOOD AS ANY RECORD IVE MADE. THIS IS NOT UR”MOTHERS 🎅🏽🎄🎅🏼ALBUM”`,
            date: new Date('July 31, 2023, 12:47 AM EDT'),
            replyCount: 410,
            retweetCount: 1282,
            quoteTweetCount: 290,
            likeCount: 15300,
            viewCount: 815000,
            bookmarkCount: 71,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `I’ve searched  for the perfect ice cream all over the🌎.I  finally found My Dream Ice cream In New Zealand,& Im More Than Thrilled  To Bring It Home to you CHER~lato Giappo is Wizzard who creates Heaven on a cone`,
            date: new Date('July 28, 2023, 2:52 PM EDT'),
            replyCount: 226,
            retweetCount: 362,
            quoteTweetCount: 102,
            likeCount: 4541,
            viewCount: 365000,
            bookmarkCount: 45,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `Many Surprises.
            This is Cher 🎄🎅🏽Album.
            Not Ur Mamas 🎄🎅🏽.
            It’s scary to make something 
            so Different . I 💚🩷it,
            One Som is one of favorites
            EVER‼️‼️‼️`,
            date: new Date('June 30, 2023, 4:51 PM EDT'),
            photoUrl1: 'https://pbs.twimg.com/media/F2JSzA7WYAAMkPQ?format=jpg&name=small',
            photoDesc1: "bus with cher's image on the side that says Cherlato on it",
            photoUrl2: 'https://pbs.twimg.com/media/F2JSzAzXQAEQ1AF?format=jpg&name=360x360',
            photoDesc2: 'gelato with colorful toppings in a cone',
            photoUrl3: 'https://pbs.twimg.com/media/F2JSzA7XAAUujYF?format=jpg&name=360x360',
            photoDesc3: 'chocolate gelato with crunchy topping in a cone',
            replyCount: 364,
            retweetCount: 607,
            quoteTweetCount: 193,
            likeCount: 4578,
            viewCount: 326000,
            bookmarkCount: 30,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `Available Now:bangbang: Cher’s It’s a Man’s World (Deluxe Edition) - This Limited-Edition LP Box Contains The Remastered Record & Rare Remixes – Both For The First Time On Red, Blue, Green & Yellow Vinyl Plus Two Exclusive, Numbered Lithographs
            http://lnk.to/itsamansworld
            🍎🐍✨`,
            date: new Date('July 14, 2023, 2:40 PM EDT'),
            replyCount: 145,
            retweetCount: 241,
            quoteTweetCount: 54,
            likeCount: 1506,
            viewCount: 116300,
            bookmarkCount: 16,
            videoUrl1: `https://socialq--seeds.s3.us-east-2.amazonaws.com/cher+it's+a+man's+world+video.mp4`,
            videoDesc1: `flipping through pages of Cher's book`,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `Listen To “Paradise Is Here (Sunrise Mix)” From The Forthcoming Deluxe Edition of ‘It’s a Man’s World.’ Available For The First Time On Vinyl 7/14 :bangbang:
            https://lnk.to/pihsm
            🩷`,
            date: new Date('July 12, 2023, 4:40 PM EDT'),
            replyCount: 120,
            retweetCount: 199,
            quoteTweetCount: 28,
            likeCount: 1578,
            viewCount: 105500,
            bookmarkCount: 19,
            videoUrl1: 'https://socialq--seeds.s3.us-east-2.amazonaws.com/cher+paradise+is+here.mp4',
            videoDesc1: `cover of cher's single Paradise is Here while track plays`,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `Ok,Will Someone 🙏🏼PLEASE
            Tell me…..When Will I Feel
            OLD👶🏻.This is ridiculous🙄. I keep hearing these numbers,but I Honestly can’t understand them.
            WHATS THE DEAL WITH #’s⁉️
            I’m dyslexic & #’s Are hard 4 me.
            
            Thank u for staying, I know it’s been hard.
            
            Got to go work out.
            Twitter is harder for me than 
            TweetBot.`,
            date: new Date('May 20, 2023, 1:40 PM EDT'),
            replyCount: 2421,
            retweetCount: 1420,
            quoteTweetCount: 280,
            likeCount: 18800,
            viewCount: 1300000,
            bookmarkCount: 134,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `1st Of All There Is No excuse for my Behavior,Talk To Me, Vent Your Sadness,Frustration,
            Disappointment,& Anger…`,
            date: new Date('March 19, 2023, 8:24 PM EDT'),
            replyCount: 1036,
            retweetCount: 361,
            quoteTweetCount: 102,
            likeCount: 4095,
            viewCount: 893000,
            bookmarkCount: 45,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `Doing Vinyl 2`,
            date: new Date('June 30, 2023, 8:24 PM EDT'),
            replyCount: 199,
            retweetCount: 123,
            quoteTweetCount: 25,
            likeCount: 1751,
            viewCount: 126400,
            bookmarkCount: 7,
            createdOnSocialQ: false
        }),
        new Tweet({
            author: cherUser._id,
            body: `Listen to “One by One (JR’s Pride Mix)” From The Forthcoming Deluxe Edition of ‘It’s a Man’s World.’ Available For The First Time On Vinyl From 7/14 - https://lnk.to/cobo
            🔥
            #OneByOne #DeluxeEdition #VinylRelease #MusicMagic #WarnerRecords`,
            date: new Date('June 29, 2023, 8:24 PM EDT'),
            replyCount: 148,
            retweetCount: 197,
            quoteTweetCount: 15,
            likeCount: 1416,
            viewCount: 105300,
            bookmarkCount: 9,
            videoUrl1: 'https://socialq--seeds.s3.us-east-2.amazonaws.com/cher+one+by+one.mp4',
            videoDesc1: `still of Cher's One by One single while track plays in background`,
            createdOnSocialQ: false
        }),
      ];
    
      return cherTweets;
};

module.exports = createCherTweets;