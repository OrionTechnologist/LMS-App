import React from 'react';
import {PageHeader} from '@/components/molecules/PageHeader';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, View, useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';

const source = {
  html: `
   <div>
        <h1>U-Pay Earn Terms and Conditions</h1><p>These Terms and Conditions ("Terms") govern your use of the U-Pay
        Earn app ("App"). By downloading, installing, or using the App, you agree to be bound by these Terms.</p><h2>1.
        User Accounts and Registration:</h2>
        <ul>
          <li>You must be at least 18 years old or the legal age of majority in your jurisdiction to create an
            account.
          </li>
          <li>You are responsible for maintaining the accuracy and completeness of your account information.</li>
          <li>You are solely responsible for the activity that occurs under your account.</li>
          <li>Sharing your account information with others is strictly prohibited.</li>
        </ul>
        <h2>2. Packages and Ad Watching:</h2>
        <ul>
          <li>U-Pay Earn offers various packages with different limitations on daily ad watching.</li>
          <li>You are responsible for choosing the package that best suits your needs.</li>
          <li>Each ad you watch will generate revenue according to the terms of your chosen package.</li>
          <li>U-Pay Earn reserves the right to adjust ad rates and package limitations at any time.</li>
        </ul>
        <h2>3. Referrals and Bonuses:</h2>
        <ul>
          <li>You can refer friends to sign up for U-Pay Earn and earn a bonus upon their successful registration.</li>
          <li>U-Pay Earn reserves the right to modify or discontinue the referral program at any time.</li>
        </ul>
        <h2>4. Support and Messaging:</h2>
        <ul>
          <li>U-Pay Earn provides a support messaging system to address your queries and concerns.</li>
          <li>We strive to respond to all messages promptly, but please allow reasonable time for a response.</li>
          <li>U-Pay Earn reserves the right to remove inappropriate or offensive content from the messaging system.</li>
        </ul>
        <h2>5. Earnings and Withdrawals:</h2>
        <ul>
          <li>Your earnings are accumulated based on your ad watching activity and any applicable bonuses.</li>
          <li>U-Pay Earn reserves the right to withhold or deduct earnings for any violation of these Terms.</li>
          <li>You can withdraw your earnings once they reach the minimum withdrawal threshold.</li>
          <li>U-Pay Earn may impose processing fees on withdrawals.</li>
        </ul>
        <h2>6. Content and Intellectual Property:</h2>
        <ul>
          <li>The App and its content, including tutorials and other materials, are protected by copyright and other
            intellectual property laws.
          </li>
          <li>You are prohibited from copying, modifying, distributing, or commercially exploiting any content without
            U-Pay Earn's express permission.
          </li>
        </ul>
        <h2>7. Termination and Suspension:</h2>
        <ul>
          <li>U-Pay Earn may terminate or suspend your account at any time for any reason, including but not limited to:
            <ul>
              <li>Violation of these Terms</li>
              <li>Inactive accounts</li>
              <li>Fraudulent activity</li>
              <li>Abusive behavior</li>
            </ul>
          </li>
          <li>U-Pay Earn will use commercially reasonable efforts to notify you of any termination or suspension.</li>
        </ul>
        <h2>8. Disclaimer and Limitation of Liability:</h2>
        <ul>
          <li>U-Pay Earn is provided "as is" and "as available" without any warranties or guarantees.</li>
          <li>U-Pay Earn is not responsible for any damages arising out of your use of the App, including but not
            limited to:
            <ul>
              <li>Loss of data or information</li>
              <li>Technical errors or interruptions</li>
              <li>Security breaches</li>
              <li>Third-party content or services</li>
            </ul>
          </li>
          <li>U-Pay Earn's liability for any damages shall be limited to the amount of your earnings, if any.</li>
        </ul>
        <h2>9. Changes to these Terms:</h2>
        <ul>
          <li>U-Pay Earn reserves the right to modify these Terms at any time.</li>
          <li>You will be notified of any changes to these Terms through the App or other communication channels.</li>
          <li>Your continued use of the App after being notified of changes constitutes your acceptance of the new
            Terms.
          </li>
        </ul>
        <h2>10. Contact Us:</h2>
        <ul>
          <li>If you have any questions or concerns about these Terms, please contact U-Pay Earn support through the App
            or at [insert contact information].
          </li>
        </ul>
        <p>By using U-Pay Earn, you acknowledge that you have read and understood these Terms and agree to be bound by
          them. Your use of the App is also subject to our Privacy Policy.</p><p>Thank you for using U-Pay Earn!</p>
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
  ul: {
    style: {color: '#000000'},
  },
  li: {
    style: {color: '#000000'},
  },
};

const TermsAndConditions = () => {
  const {width} = useWindowDimensions();
  const {goBack} = useNavigation();

  return (
    <>
      <PageHeader
        variant={'title-bar'}
        titleInfoProps={{
          title: 'Terms & Conditions',
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

export default TermsAndConditions;
