import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../Components';
import {AppColors} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../utils/Theme';

const TermConditions = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#808080', Theme.privicypolicybackground]}
      style={styles.screen}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: '3%',
        }}>
        <BackButton IconSize={30} />
        <Text style={styles.headerTitle}> Privacy And Policy</Text>
      </View>
      <ScrollView>
        <View style={styles.privacyContainer}>
          <Text style={styles.heading}>
            This Privacy Policy applies to the Reverrapp.com.in
          </Text>
          <Text style={styles.details}>
            reverrapp.com recognises the importance of maintaining your privacy.
            We value your privacy and appreciate your trust in us. This Policy
            describes how we treat user information we collect on
            https://reverrapp.com/ and other offline sources. This Privacy
            Policy applies to current and former visitors to our website and to
            our online customers. By visiting and/or using our website, you
            agree to this Privacy Policy. Reverrapp.com is a property of DSquare
            Ventures LLP, an Indian Company registered under the Companies Act,
            2013 having its registered office at 601, GDITL Northex Tower,
            Netaji Subhash place, Pitam pura, Delhi- 110034
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '7%'},
            ]}>
              Information we collect
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Contact information.
            </Text>
            We might collect your Reverr , support@reverr.in, 9871960850 GDITL
            Northex Tower, Netaji Subhash place, Pitam pura, Delhi-
            110034,country.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Payment and billing information.
            </Text>{' '}
            We might collect your billing name, billing address and payment
            method when you buy a ticket. We NEVER collect your credit card
            number or credit card expiry date or other details pertaining to
            your credit card on our website. Credit card information will be
            obtained and processed by our online payment partner CC Avenue.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Information you post.
            </Text>{' '}
            We collect information you post in a public space on our website or
            on a third-party social media site belonging to Reverrapp.com.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Demographic information.
            </Text>
            We may collect demographic information about you, events you like,
            events you intend to participate in, tickets you buy, or any other
            information provided by your during the use of our website. We might
            collect this as a part of a survey also.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Other information.
            </Text>
            If you use our website, we may collect information about your IP
            address and the browser you're using. We might look at what site you
            came from, duration of time spent on our website, pages accessed or
            what site you visit when you leave us. We might also collect the
            type of mobile device you are using, or the version of the operating
            system your computer or device is running.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            We collect information in different ways.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We collect information directly from you
            </Text>
            We collect information directly from you when you register for an
            event or buy tickets. We also collect information if you post a
            comment on our websites or ask us a question through phone or email.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We collect information from you passively.
            </Text>
            We use tracking tools like Google Analytics, Google Webmaster,
            browser cookies and web beacons for collecting information about
            your usage of our website
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We get information about you from third parties.
            </Text>
            For example, if you use an integrated social media feature on our
            websites. The third-party social media site will give us certain
            information about you. This could include your name and email
            address.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Use of your personal information
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information to contact you:
            </Text>
            We might use the information you provide to contact you for
            confirmation of a purchase on our website or for other promotional
            purposes.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information to respond to your requests or questions.
            </Text>
            . We might use your information to confirm your registration for an
            event or contest.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information to improve our products and services.
            </Text>
            We might use your information to customize your experience with us.
            This could include displaying content based upon your preferences.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information to look at site trends and customer interests.
            </Text>
            We may use your information to make our website and products better.
            We may combine information we get from you with information about
            you we get from third parties.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information for security purposes.
            </Text>
            We may use information to protect our company, our customers, or our
            websites.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information for marketing purposes.
            </Text>
            . We might send you information about special promotions or offers.
            We might also tell you about new features or products. These might
            be our own offers or products, or third-party offers or products we
            think you might find interesting. Or, for example, if you buy
            tickets from us we'll enroll you in our newsletter.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We use information to send you transactional communications.
            </Text>
            We might send you emails or SMS about your account or a ticket
            purchase
          </Text>
          <Text style={styles.details}>
            We use information as otherwise permitted by law.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Sharing of information with third-parties
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We will share information with third parties who perform services
              on our behalf.
            </Text>
            We share information with vendors who help us manage our online
            registration process or payment processors or transactional message
            processors. Some vendors may be located outside of India.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We will share information with the event organizers.
            </Text>
            We share your information with event organizers and other parties
            responsible for fulfilling the purchase obligation. The event
            organizers and other parties may use the information we give them as
            described in their privacy policies.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We will share information with our business partners.
            </Text>
            This includes a third party who provide or sponsor an event, or who
            operates a venue where we hold events. Our partners use the
            information we give them as described in their privacy policies.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We may share information if we think we have to in order to comply
              with the law or to protect ourselves.
            </Text>
            We will share information to respond to a court order or subpoena.
            We may also share it if a government agency or investigatory body
            requests. Or, we might also share information when we are
            investigating potential fraud.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We may share information with any successor to all or part of our
              business.
            </Text>
            For example, if part of our business is sold we may give our
            customer list as part of that transaction.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              We may share your information for reasons not described in this
              policy.
            </Text>
            We will tell you before we do this.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Email Opt-Out
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              You can opt out of receiving our marketing emails.
            </Text>
            To stop receiving our promotional emails, please email
            support@reverrapp.com.in. It may take about ten days to process your
            request. Even if you opt out of getting marketing messages, we will
            still be sending you transactional messages through email and SMS
            about your purchases.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Third party sites
          </Text>
          <Text style={styles.details}>
            If you click on one of the links to third party websites, you may be
            taken to websites we do not control. This policy does not apply to
            the privacy practices of those websites. Read the privacy policy of
            other websites carefully. We are not responsible for these third
            party sites.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Grievance Officer
          </Text>
          <Text style={styles.details}>
            In accordance with Information Technology Act 2000 and rules made
            there under, the name and contact details of the Grievance Officer
            are provided below:
          </Text>
          <Text style={styles.details}>Mr. Ravneet Singh Bhatia</Text>
          <Text style={styles.details}>
            234 Neelkanth Apartment Sector 13, Rohini
          </Text>
          <Text style={styles.details}>New Delhi- 110085</Text>
          <Text style={styles.details}>Phone: +91 8826131300</Text>
          <Text style={styles.details}>Email: support@reverr.in</Text>
          <Text style={styles.details}>
            If you have any questions about this Policy or other privacy
            concerns, you can also email us at reverrapp.com
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Updates to this policy
          </Text>
          <Text style={styles.details}>
            This Privacy Policy was last updated on 04.01.2022. From time to
            time we may change our privacy practices. We will notify you of any
            material changes to this policy as required by law. We will also
            post an updated copy on our website. Please check our site
            periodically for updates.
          </Text>
          <Text
            style={[
              styles.heading,
              {textAlign: 'auto', paddingVertical: '2%'},
            ]}>
            Jurisdiction
          </Text>
          <Text style={styles.details}>
            If you choose to visit the website, your visit and any dispute over
            privacy is subject to this Policy and the website's terms of use. In
            addition to the foregoing, any disputes arising under this Policy
            shall be governed by the laws of India
          </Text>
        </View>
        <View style={{marginTop: '5%', paddingHorizontal: '2%'}}>
          <Text style={styles.heading}>TERMS OF SERVICE AGREEMENT</Text>
          <Text style={styles.details}>LAST REVISION: [04-01-22]</Text>
          <Text style={styles.details}>
            PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING THIS
            WEBSITE OR ORDERING PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND
            BY ALL OF THE TERMS AND CONDITIONS OF THIS AGREEMENT.
          </Text>
          <Text style={styles.details}>
            This Terms of Service Agreement (the "Agreement") governs your use
            of this website https://reverrapp.com/ (the "Website"), DSquare
            Ventures LLP offer of products for purchase on this Website, or your
            purchase of products available on this Website. This Agreement
            includes, and incorporates by this reference, the policies and
            guidelines referenced below. DSquare Ventures LLP reserves the right
            to change or revise the terms and conditions of this Agreement at
            any time by posting any changes or a revised Agreement on this
            Website. DSquare Ventures LLP will alert you that changes or
            revisions have been made by indicating on the top of this Agreement
            the date it was last revised. The changed or revised Agreement will
            be effective immediately after it is posted on this Website. Your
            use of the Website following the posting any such changes or of a
            revised Agreement will constitute your acceptance of any such
            changes or revisions. DSquare Ventures LLP encourages you to review
            this Agreement whenever you visit the Website to make sure that you
            understand the terms and conditions governing use of the Website.
            This Agreement does not alter in any way the terms or conditions of
            any other written agreement you may have with DSquare Ventures LLP
            for other products or services. If you do not agree to this
            Agreement (including any referenced policies or guidelines), please
            immediately terminate your use of the Website. If you would like to
            print this Agreement, please click the print button on your browser
            toolbar.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            I. PRODUCTS
          </Text>
          <Text style={styles.details}>
            Terms of Offer. This Website offers for sale certain products .By
            placing an order for Products through this Website, you agree to the
            terms set forth in this Agreement.
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Customer Solicitation:
            </Text>
            Unless you notify our third party call center reps or direct DSquare
            Ventures LLP sales reps, while they are calling you, of your desire
            to opt out from further direct company communications and
            solicitations, you are agreeing to continue to receive further
            emails and call solicitations DSquare Ventures LLP and its
            designated in house or third party call team(s).
          </Text>
          <Text style={styles.details}>
            <Text
              style={[
                styles.details,
                {fontFamily: 'Poppins-Bold', color: AppColors.FontsColor},
              ]}>
              Opt Out Procedure:
            </Text>
            We provide 3 easy ways to opt out of from future solicitations.
          </Text>
          <Text style={[styles.details, {paddingVertical: 0}]}>
            1. You may use the opt out link found in any email solicitation that
            you may receive.
          </Text>
          <Text style={[styles.details, {paddingVertical: 0}]}>
            2. You may also choose to opt out, via sending your email address
            to: support@reverr.in
          </Text>
          <Text style={[styles.details, {paddingVertical: 0}]}>
            3. You may send a written remove request to 601, GDITL Northex
            Tower, Netaji Subhash place, Pitam pura, Delhi- 110034.
          </Text>
          <Text style={styles.details}>
            Proprietary Rights. DSquare Ventures LLP has proprietary rights and
            trade secrets in the Products. You may not copy, reproduce, resell
            or redistribute any Product manufactured and/or distributed by
            DSquare Ventures LLP. DSquare Ventures LLP also has rights to all
            trademarks and trade dress and specific layouts of this webpage,
            including calls to action, text placement, images and other
            information.
          </Text>
          <Text style={styles.details}>
            Sales Tax. If you purchase any Products, you will be responsible for
            paying any applicable sales tax.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            II. WEBSITE
          </Text>
          <Text style={styles.details}>
            Content; Intellectual Property; Third Party Links. In addition to
            making Products available, this Website also offers information and
            marketing materials. This Website also offers information, both
            directly and through indirect links to third-party websites, about
            nutritional and dietary supplements. DSquare Ventures LLP does not
            always create the information offered on this Website; instead the
            information is often gathered from other sources. To the extent that
            DSquare Ventures LLP does create the content on this Website, such
            content is protected by intellectual property laws of the India,
            foreign nations, and international bodies. Unauthorized use of the
            material may violate copyright, trademark, and/or other laws. You
            acknowledge that your use of the content on this Website is for
            personal, noncommercial use. Any links to third-party websites are
            provided solely as a convenience to you. DSquare Ventures LLP does
            not endorse the contents on any such third-party websites. DSquare
            Ventures LLP is not responsible for the content of or any damage
            that may result from your access to or reliance on these third-party
            websites. If you link to third-party websites, you do so at your own
            risk. Use of Website; DSquare Ventures LLP is not responsible for
            any damages resulting from use of this website by anyone. You will
            not use the Website for illegal purposes. You will (1) abide by all
            applicable local, state, national, and international laws and
            regulations in your use of the Website (including laws regarding
            intellectual property), (2) not interfere with or disrupt the use
            and enjoyment of the Website by other users, (3) not resell material
            on the Website, (4) not engage, directly or indirectly, in
            transmission of "spam", chain letters, junk mail or any other type
            of unsolicited communication, and (5) not defame, harass, abuse, or
            disrupt other users of the Website License. By using this Website,
            you are granted a limited, non-exclusive, non-transferable right to
            use the content and materials on the Website in connection with your
            normal, noncommercial, use of the Website. You may not copy,
            reproduce, transmit, distribute, or create derivative works of such
            content or information without express written authorization from
            DSquare Ventures LLP or the applicable third party (if third party
            content is at issue). Posting. By posting, storing, or transmitting
            any content on the Website, you hereby grant DSquare Ventures LLP a
            perpetual, worldwide, non-exclusive, royalty-free, assignable, right
            and license to use, copy, display, perform, create derivative works
            from, distribute, have distributed, transmit and assign such content
            in any form, in all media now known or hereinafter created, anywhere
            in the world. DSquare Ventures LLP does not have the ability to
            control the nature of the user-generated content offered through the
            Website. You are solely responsible for your interactions with other
            users of the Website and any content you post. DSquare Ventures LLP
            is not liable for any damage or harm resulting from any posts by or
            interactions between users. DSquare Ventures LLP reserves the right,
            but has no obligation, to monitor interactions between and among
            users of the Website and to remove any content DSquare Ventures LLP
            deems objectionable, in MuscleUP Nutrition 's sole discretion.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            III. DISCLAIMER OF WARRANTIES
          </Text>
          <Text style={styles.details}>
            YOUR USE OF THIS WEBSITE AND/OR PRODUCTS ARE AT YOUR SOLE RISK. THE
            WEBSITE AND PRODUCTS ARE OFFERED ON AN "AS IS" AND "AS AVAILABLE"
            BASIS. DSquare Ventures LLP EXPRESSLY DISCLAIMS ALL WARRANTIES OF
            ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE AND NON-INFRINGEMENT WITH RESPECT TO THE PRODUCTS OR WEBSITE
            CONTENT, OR ANY RELIANCE UPON OR USE OF THE WEBSITE CONTENT OR
            PRODUCTS. ("PRODUCTS" INCLUDE TRIAL PRODUCTS.) WITHOUT LIMITING THE
            GENERALITY OF THE FOREGOING, DSquare Ventures LLP MAKES NO WARRANTY:
            THAT THE INFORMATION PROVIDED ON THIS WEBSITE IS ACCURATE, RELIABLE,
            COMPLETE, OR TIMELY. THAT THE LINKS TO THIRD-PARTY WEBSITES ARE TO
            INFORMATION THAT IS ACCURATE, RELIABLE, COMPLETE, OR TIMELY. NO
            ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM
            THIS WEBSITE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN.
            AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE PRODUCTS
            OR THAT DEFECTS IN PRODUCTS WILL BE CORRECTED. REGARDING ANY
            PRODUCTS PURCHASED OR OBTAINED THROUGH THE WEBSITE. SOME
            JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO
            SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            IV. LIMITATION OF LIABILITY
          </Text>
          <Text style={styles.details}>
            DSquare Ventures LLP ENTIRE LIABILITY, AND YOUR EXCLUSIVE REMEDY, IN
            LAW, IN EQUITY, OR OTHWERWISE, WITH RESPECT TO THE WEBSITE CONTENT
            AND PRODUCTS AND/OR FOR ANY BREACH OF THIS AGREEMENT IS SOLELY
            LIMITED TO THE AMOUNT YOU PAID, LESS SHIPPING AND HANDLING, FOR
            PRODUCTS PURCHASED VIA THE WEBSITE. DSquare Ventures LLP WILL NOT BE
            LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR
            CONSEQUENTIAL DAMAGES IN CONNECTION WITH THIS AGREEMENT OR THE
            PRODUCTS IN ANY MANNER, INCLUDING LIABILITIES RESULTING FROM (1) THE
            USE OR THE INABILITY TO USE THE WEBSITE CONTENT OR PRODUCTS; (2) THE
            COST OF PROCURING SUBSTITUTE PRODUCTS OR CONTENT; (3) ANY PRODUCTS
            PURCHASED OR OBTAINED OR TRANSACTIONS ENTERED INTO THROUGH THE
            WEBSITE; OR (4) ANY LOST PROFITS YOU ALLEGE. SOME JURISDICTIONS DO
            NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR
            CONSEQUENTIAL DAMAGES SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY
            TO YOU.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            V. INDEMNIFICATION
          </Text>
          <Text style={styles.details}>
            You will release, indemnify, defend and hold harmless DSquare
            Ventures LLP, and any of its contractors, agents, employees,
            officers, directors, shareholders, affiliates and assigns from all
            liabilities, claims, damages, costs and expenses, including
            reasonable attorneys' fees and expenses, of third parties relating
            to or arising out of (1) this Agreement or the breach of your
            warranties, representations and obligations under this Agreement;
            (2) the Website content or your use of the Website content; (3) the
            Products or your use of the Products (including Trial Products); (4)
            any intellectual property or other proprietary right of any person
            or entity; (5) your violation of any provision of this Agreement; or
            (6) any information or data you supplied to DSquare Ventures LLP.
            When DSquare Ventures LLP is threatened with suit or sued by a third
            party, DSquare Ventures LLP may seek written assurances from you
            concerning your promise to indemnify DSquare Ventures LLP; your
            failure to provide such assurances may be considered by DSquare
            Ventures LLP to be a material breach of this Agreement. DSquare
            Ventures LLP will have the right to participate in any defense by
            you of a third-party claim related to your use of any of the Website
            content or Products, with counsel of DSquare Ventures LLP choice at
            its expense. DSquare Ventures LLP will reasonably cooperate in any
            defense by you of a third-party claim at your request and expense.
            You will have sole responsibility to defend DSquare Ventures LLP
            against any claim, but you must receive DSquare Ventures LLP prior
            written consent regarding any related settlement. The terms of this
            provision will survive any termination or cancellation of this
            Agreement or your use of the Website or Products.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            VI. PRIVACY
          </Text>
          <Text style={styles.details}>
            DSquare Ventures LLP believes strongly in protecting user privacy
            and providing you with notice of MuscleUP Nutrition 's use of data.
            Please refer to DSquare Ventures LLP privacy policy, incorporated by
            reference herein, that is posted on the Website.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            VII. AGREEMENT TO BE BOUND
          </Text>
          <Text style={styles.details}>
            By using this Website or ordering Products, you acknowledge that you
            have read and agree to be bound by this Agreement and all terms and
            conditions on this Website.
          </Text>
          <Text
            style={[
              styles.details,
              {fontFamily: 'Poppins-Bold', fontSize: 18},
            ]}>
            VIII. GENERAL
          </Text>
          <Text style={styles.details}>
            Force Majeure. DSquare Ventures LLP will not be deemed in default
            hereunder or held responsible for any cessation, interruption or
            delay in the performance of its obligations hereunder due to
            earthquake, flood, fire, storm, natural disaster, act of God, war,
            terrorism, armed conflict, labor strike, lockout, or boycott.
            Cessation of Operation. DSquare Ventures LLP may at any time, in its
            sole discretion and without advance notice to you, cease operation
            of the Website and distribution of the Products. Entire Agreement.
            This Agreement comprises the entire agreement between you and
            DSquare Ventures LLP and supersedes any prior agreements pertaining
            to the subject matter contained herein. Effect of Waiver. The
            failure of DSquare Ventures LLP to exercise or enforce any right or
            provision of this Agreement will not constitute a waiver of such
            right or provision. If any provision of this Agreement is found by a
            court of competent jurisdiction to be invalid, the parties
            nevertheless agree that the court should endeavor to give effect to
            the parties' intentions as reflected in the provision, and the other
            provisions of this Agreement remain in full force and effect.
            Governing Law; Jurisdiction. This Website originates from the
            Delhi.This Agreement will be governed by the laws of the State of
            [Law State Name] without regard to its conflict of law principles to
            the contrary. Neither you nor DSquare Ventures LLP will commence or
            prosecute any suit, proceeding or claim to enforce the provisions of
            this Agreement, to recover damages for breach of or default of this
            Agreement, or otherwise arising under or by reason of this
            Agreement, other than in courts located in State of Delhi. By using
            this Website or ordering Products, you consent to the jurisdiction
            and venue of such courts in connection with any action, suit,
            proceeding or claim arising under or by reason of this Agreement.
            You hereby waive any right to trial by jury arising out of this
            Agreement and any related documents. Statute of Limitation. You
            agree that regardless of any statute or law to the contrary, any
            claim or cause of action arising out of or related to use of the
            Website or Products or this Agreement must be filed within one (1)
            year after such claim or cause of action arose or be forever barred.
            Waiver of Class Action Rights. BY ENTERING INTO THIS AGREEMENT, YOU
            HEREBY IRREVOCABLY WAIVE ANY RIGHT YOU MAY HAVE TO JOIN CLAIMS WITH
            THOSE OF OTHER IN THE FORM OF A CLASS ACTION OR SIMILAR PROCEDURAL
            DEVICE. ANY CLAIMS ARISING OUT OF, RELATING TO, OR CONNECTION WITH
            THIS AGREEMENT MUST BE ASSERTED INDIVIDUALLY. Termination. DSquare
            Ventures LLP reserves the right to terminate your access to the
            Website if it reasonably believes, in its sole discretion, that you
            have breached any of the terms and conditions of this Agreement.
            Following termination, you will not be permitted to use the Website
            and DSquare Ventures LLP may, in its sole discretion and without
            advance notice to you, cancel any outstanding orders for Products.
            If your access to the Website is terminated, DSquare Ventures LLP
            reserves the right to exercise whatever means it deems necessary to
            prevent unauthorized access of the Website. This Agreement will
            survive indefinitely unless and until DSquare Ventures LLP chooses,
            in its sole discretion and without advance to you, to terminate it.
            Domestic Use. DSquare Ventures LLP makes no representation that the
            Website or Products are appropriate or available for use in
            locations outside India. Users who access the Website from outside
            India do so at their own risk and initiative and must bear all
            responsibility for compliance with any applicable local laws.
            Assignment. You may not assign your rights and obligations under
            this Agreement to anyone. DSquare Ventures LLP may assign its rights
            and obligations under this Agreement in its sole discretion and
            without advance notice to you. BY USING THIS WEBSITE OR ORDERING
            PRODUCTS FROM THIS WEBSITE YOU AGREE TO BE BOUND BY ALL OF THE TERMS
            AND CONDITIONS OF THIS AGREEMENT
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.primarycolor,
  },
  headerTitle: {
    color: AppColors.FontsColor,
    marginStart: '14%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  privacyContainer: {
    
    textAlign:"justify",
    paddingTop: '7%',
    paddingHorizontal: '2%',
  },
  heading: {
    padding:10,
    color: AppColors.FontsColor,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  details: {
    padding:10,
    color: AppColors.termColor,
    fontFamily: 'Poppins-Regular',
    paddingVertical: '2%',
    textAlign: 'justify',
  },
});
export {TermConditions};
