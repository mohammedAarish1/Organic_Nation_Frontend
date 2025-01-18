import React from 'react'

const IntroductionSection = () => {
  return (
    <Section id={id} title="Introduction">
            <p>Welcome to Organic Nation ! These Terms and Conditions govern your access to and use of the Website (defined below) among other things. By using this Website, you affirm that you are of legal age to enter into these Terms and Conditions, or, if you are not, that you have obtained parental or guardian consent to enter into these Terms and Conditions and your parent or guardian consents to these Terms and Conditions on your behalf. If you violate or do not agree to these Terms and Conditions, then your access to and use of the Website is unauthorized. You shall not use this Website if you are not competent to contract under the applicable laws, rules and regulations.</p>
            <ol className='list-disc  flex flex-col gap-3 mt-2'>
              <li>
                <span>DEFINED TERMS: </span> In these Terms and Conditions: “Agreement” means the terms and conditions as detailed herein including all schedules, appendices, annexure, privacy policy and will include the references to this Agreement as amended, supplemented, varied or replaced time to time.
                <ul className='list-inside pl-3 list-decimal flex flex-col gap-3 mt-2'>
                  <li> When we say “Organic Nation” we mean Foodsbay India, an India based company incorporated under the Indian Companies Act and any subsidiaries of Foodsbay India. (including any subsidiaries that Foodsbay India. may form or acquire in the future), and their affiliates, directors, officers, employees and agents. We also refer to Organic Nation as “we,” “us” and “our.” But when we say “Foodsbay Entities,” we mean Foodsbay; its suppliers, vendors, contractors, and licensors.</li>
                  <li>Foodsbay India. is the owner and operator of www.organicnation.co.in and is engaged in the business of curating, designing and selling consumer products under the brand name “Organic Nation”. When we say “Website”, we mean the website www.organicnation.co.in, and all related functionality, services, and content offered by or for Organic Nation on or through www.organicnation.co.in, and includes the systems, servers, and networks used to make the Website available.</li>
                  <li>When we say “you” or “your” we mean any customer or user (like you!) of this Website and any person who has notice of these Terms and Conditions.</li>
                  <li>When we say “Terms and Conditions,” we mean these Terms and Conditions and all other terms and policies posted by Organic Nation on the website (and any updates by Organic Nation to these Terms and Conditions and those terms and policies).</li>
                </ul>
              </li>
              <li>
                <span>UPDATES: </span> We may update these Terms and Conditions from time to time by notifying you of such changes by any reasonable means, including by posting a revised Terms and Conditions through the Website. Any such changes will not apply to any dispute between you and us arising prior to the date on which we posted the revised Terms and Conditions incorporating such changes or otherwise notified you of such changes. You agree that it your responsibility to regularly check www.organicnation.co.in, for any updated Terms and Conditions. In addition, by continuing to use or access to the Website or otherwise engaging with Organic Nation after we post any changes, you accept the updated Terms Website. The “Last Updated” legend indicates when these Terms and Conditions were last changed.
              </li>
            </ol>
          
    {/* Rest of the introduction content */}
  </Section>
  )
}

export default IntroductionSection
