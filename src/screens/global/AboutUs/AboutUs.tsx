import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

const source = {
  html: `
   <div><h1>U-Pay Earn: Watch Ads, Earn Rewards, and Level Up!</h1><p>U-Pay Earn offers you the chance to earn real
          cash and unlock a world of possibilities, all from your mobile device! Download it today and explore:</p>
          <h2>Earn Real Money, Your Way:</h2>
          <ul>
            <li><p><strong>Watch Ads</strong>: Earn cash by watching ads. The more you watch, the more you earn! Select
              a package tailored to your daily ad limit and earning potential.</p></li>
            <li><p><strong>Refer &amp; Share</strong>: Spread the word and reap rewards! Invite friends to join U-Pay
              Earn, and when they sign up and start watching ads, you receive bonus rewards.</p></li>
          </ul>
          <h2>Level Up Your U-Pay Earn Experience:</h2>
          <ul>
            <li><p><strong>Package Power</strong>: Choose the U-Pay Earn package that suits your style and goals.
              Different packages offer varying daily ad limits and earning potential—pick the right one for you!</p>
            </li>
            <li><p><strong>Learn &amp; Grow</strong>: Explore our vast library of tutorial videos filled with tips and
              tricks to maximize your earnings and enhance your U-Pay Earn experience.</p></li>
          </ul>
          <h2>Connect &amp; Stay Supported:</h2>
          <ul>
            <li><p><strong>Friend Zone</strong>: Create your U-Pay Earn community! Connect with friends, track
              collective earnings on a leaderboard, and share your successes.</p></li>
            <li><p><strong>Direct Support</strong>: Our friendly U-Pay Earn team is always available. We're here to
              answer your questions and assist you every step of the way.</p></li>
          </ul>
          <h2>Effortless Cash Out:</h2>
          <ul>
            <li><strong>Withdraw &amp; Enjoy</strong>: Seamlessly transfer your earned rewards directly to your
              preferred payment method. Your hard-earned cash is just a tap away!
            </li>
          </ul>
          <p>U-Pay Earn isn't just an app; it's a community of empowered earners. Join us and enjoy:</p>
          <ul>
            <li><p><strong>Flexibility</strong>: Watch ads at your convenience, whenever it suits your schedule.</p>
            </li>
            <li><p><strong>Control</strong>: Choose your package, manage your earnings, and track your progress in
              real-time.</p></li>
            <li><p><strong>Transparency</strong>: Each ad's earning potential is clear, and your rewards are accurately
              tracked.</p></li>
          </ul>
          <p>Download U-Pay Earn today and start earning!</p><p><em>P.S. Don't miss exclusive updates, contests, and
            more! Follow us on social media for all things U-Pay Earn.</em></p>
        </div>
  `,
};

const tagsStyles = {
  body: {
    color: '#000000',
  },
  p: {
    style: {color: '#000000'},
  },
  div: {
    style: {color: '#000000'},
  },
  h1: {
    style: {color: '#000000'},
  },
  h2: {
    style: {color: '#000000'},
  },
  strong: {
    style: {color: '#000000'},
  },
  ul: {
    style: {color: '#000000'},
  },
  li: {
    style: {color: '#000000'},
  },
};

const AboutUs = () => {
  const {width} = useWindowDimensions();
  const {goBack} = useNavigation();

  return (
    <>
      <PageHeader
        variant={'title-bar'}
        titleInfoProps={{
          title: 'About Us',
        }}
        showBackButton={true}
        onClickBackButton={goBack}
      />
      <ScrollView>
        <View className={'p-[20px]'}>
          <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={tagsStyles as any}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default AboutUs;
