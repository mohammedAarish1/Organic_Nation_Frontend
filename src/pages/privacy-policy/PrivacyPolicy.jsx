import React from 'react';
// react icons 
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';


const PrivacyPolicy = () => {
    return (
        <div className=" min-h-screen font-sans bg-[var(--background-color)]">

            <div className='relative leading-10 text-center'>
                <h2 className='text-3xl font-medium tracking-widest'>Privacy Policy</h2>
                <p className='text-gray-500 text-sm'>Last Updated: 25<sup>th</sup> June 2024 </p>
            </div>

            {/* content  */}
            <div className="xs:w-[80%] mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* =================Introduction =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Introduction</h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>
                            Ensure you always know what information we collect about you, how we use it, and have meaningful control over all of it. We want to provide you with tools so you can make the best choices with the information you provide us.
                            In essence, that&#180;s what this Privacy Policy is all about.
                        </p>

                        <p>Thank you for visiting organicnation.co.in. We are committed to protecting your personal information and your right to privacy.</p>
                        <p><span className='font-bold'>www.organicnation.co.in</span> is owned and operated by FOODSBAY INDIA and is engaged in the business of curating, designing and selling consumer products under the brand name <Link to='/' className='font-bold hover:underline underline-offset-2'>“Organic Nation”</Link>. When we say “Website”, we mean the website www.urbanplatter.in, and all related functionality, services, and content offered by or for Foodsbay India on or through www.organicnation.co.in, social media handles, and includes the systems, servers, and networks used to make the Website available. We also refer to Foodsbay India as “we,” “us” and “our.”</p>

                        <p>When you visit our website, and more generally, use any of our services (the “Services“, which include the Website) we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this protection arrangement, we look for to clarify to you within the clearest way conceivable what data we collect, how we utilize it and what rights you have got in connection to it. We hope you take some time to read through it carefully, because it is critical. If you come across any terms in this privacy notice that you do not agree with, please refrain from using our Services immediately.</p>

                        <p>PLEASE READ THIS PRIVACY POLICY CAREFULLY TO MAKE SURE YOU UNDERSTAND HOW ANY PERSONAL INFORMATION YOU PROVIDE TO US WILL BE USED, SHARED AND HANDLED. IF YOU USE ANY OF OUR SERVICES, YOU WILL BE REGARDED AS HAVING READ AND ACCEPTED THIS PRIVACY POLICY, ITS TERMS AND CONDITIONS UNDER "TERMS OF USE" AND BY MERE USE OF THIS WEBSITE, YOU EXPRESSLY CONSENT TO OUR USE AND DISCLOSURE OF YOUR PERSONAL INFORMATION IN ACCORDANCE WITH THIS PRIVACY POLICY. THIS DOCUMENT SUPERSEDES ANY PRIOR COMMUNICATION ON THIS TOPIC AND REFLECTS THE ENTIRE AND EXCLUSIVE PRIVACY POLICY FOR THIS WEBSITE. WE RESERVE THE RIGHT TO CHANGE OUR POLICY BY POSTING A NEW VERSION OF IT ON OUR WEBSITE.</p>

                        <p>This document is published and shall be construed in accordance with the provisions of the Information Technology Act, 2000 read with Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data of Information) Rules, 2011 under the Information Technology Act, 2000; that require publishing of the Privacy Policy for collection, use, storage and transfer of sensitive personal data or information.</p>

                        <p>The Company is committed to ensuring that your privacy is protected, uniform practices for collecting, using, disclosing, storing, retaining, disposing, accessing, transferring or otherwise processing such information assists the Company to process Personal Information appropriately, processing, disclosing it and/or transferring it only under appropriate circumstances. This Privacy Policy is provided to explain our policies and practices regarding the collection, use, processing and disclosure of information about you. That’s why we insist upon the highest standards for secure transactions and user information privacy. Please read the following statement to learn about our information gathering and dissemination practices.</p>

                        <p>We know that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. We are strongly committed to protecting your privacy and have taken all necessary and reasonable measures to protect the confidentiality of your information and its transmission through the world wide web and the Company shall not be held liable for disclosure of the confidential information when in accordance with this Privacy Policy. This Privacy Policy describes how we handle your personal information for our services on this Website.</p>
                    </div>
                </div>
                {/* =================collection of information =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>How do we collect the information</h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <ol className='list-decimal flex flex-col gap-4'>
                            <li>We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.</li>
                            <li>
                                <p>
                                    The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following:
                                    Payment information in compliance with the new RBI Regulations effective October 1, 2022;
                                </p>
                                <p>Due to Reserve Bank of India (RBI) card storage regulations, starting October 1, 2022, we can no longer save customer card details for accounts whose billing address is in India (card number, expiry date, etc.) in the current format. However, with your authorization, we can save your card details in a format that complies with the new RBI regulations and keeps your sensitive card details secure.</p>

                                <p>If you're using Visa or Mastercard, you only need to make one manual payment using your existing card details to authorize us to save your card in the new format. To avoid having to enter your card details again later, it's recommended that you make this single manual payment before September 30, 2022.</p>

                                <p>In the unlikely event that we’re unable to save your Visa or Mastercard in a compliant format by September 30, 2022, you’ll need to re-enter your card information every time you make payments later.</p>

                                <ol>
                                    <li>*your age;</li>
                                    <li>*your location information;</li>
                                    <li>*your IP address</li>
                                    <li>*people, addresses and phone numbers listed in your Addresses;</li>
                                    <li>*e-mail addresses of your friends and other people;</li>
                                    <li>*content of reviews and e-mails to us;</li>
                                    <li>*images, videos and other content collected or stored in connection with tickets and customer support;</li>
                                    <li>*information and officially valid documents regarding identity and address information, including PAN numbers;</li>
                                    <li>*credit history information; and</li>
                                    <li>*corporate and financial information.</li>
                                </ol>
                            </li>
                            <li>We do not intentionally collect any special categories of personal data (sensitive personal information) via our websites unless we are legally required to do so, for example, for recruitment purposes. Sensitive personal information includes: information revealing racial or ethnic origin; political opinions; religious or philosophical beliefs; trade-union membership; the processing of genetic or biometric data for the purpose of uniquely identifying a natural person; information concerning health; information concerning a natural person’s sex life or sexual orientation; and in some cases, social security numbers or financial information.</li>
                            <li>If you choose to provide us with personal information, you consent to the transfer and storage of that information on our servers and use of your personal information as mentioned in the Privacy Policy.</li>
                            <li>You hereby authorize and permit the Company to disclose, from time to time, any information on or relating to you, to any of its subsidiaries or affiliates or to any governmental authority, statutory authority, judicial authority, associated partners, whether in India or any other jurisdiction, or any other third party or the Company’s consultants, advisors or service providers or commercial partners, strictly in relation to the services provided by the Company, as provided in the Company’s Privacy Policy, without requirement for any further consent from you at any point of time.</li>
                            <li>Like numerous businesses, we too collect data through treats and comparable advances. You’ll be able discover out more approximately this in our Cookie Note and Policy. Cookies are small data files stored on your hard drive with websites. Among other things, cookies help us improve our website, our marketing activities, and your experience. We use cookies to see which areas and features are popular and to count visits to our website. Most Web browsers are set to accept cookies by default. If you prefer, you can choose to set your browser to remove cookies and to reject cookies. If you set your browser to reject cookies, some features will be unavailable. For more information on how to reject cookies, see your browser’s instructions on changing your cookie settings.</li>
                            <li>If you interact with us on a social media platform using your social media account (e.g. Instagram or Facebook), we receive personal information about you such as your name, email address, and gender. Any personal information that we collect from your social media account depends on your social media account’s privacy settings.</li>
                            <li>We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.</li>
                        </ol>
                    </div>
                </div>
                {/* =================use of information =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>How do we use the information </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <ol className='list-decimal flex flex-col gap-4'>
                            <li>We collect personal information from you to identify you, to provide you with information required to service you, for analysis and evaluation in order to help us improve the services we provide and to enhance your experience by providing you with better services. The purpose of collection of your personal information also includes:
                                <p>* Purchase and delivery of products and services. We use your personal information to take and fulfill orders, deliver products and services, process payments, and communicate with you about orders, products and services, and promotional offers.</p>
                                <p>* Provide, troubleshoot, and improve Foodsbay India services. We use your personal information to provide functionality, analyse performance, fix errors, and improve the usability and effectiveness of Foodsbay India’s services.</p>
                                <p>* Recommendations and personalization. We use your personal information to recommend features, products, and services that might be of interest to you, identify your preferences, and personalize your experience with Foodsbay India’s services.</p>
                                <p>* Communicate with you. We use your personal information to communicate with you in relation to Foodsbay India’s services via different channels (e.g., by phone, e-mail, chat).</p>
                                <p>* Advertising. We use your personal information to display interest-based ads for features, products, and services that might be of interest to you. We do not use information that personally identifies you to display interest-based ads.</p>
                                <p>* To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</p>
                                <p>* To deliver targeted advertising to you. We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness. For more information see Cookie Note and Policy.</p>
                                <p>* For other business purposes. We may use your information for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Website, Services, products, marketing and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information. We will not use identifiable personal information without your consent.</p>
                            </li>
                            <li>Your personal data will be retained in a form which enables the Company to identify the individual for no longer than it is necessary for the purposes for which the data was collected and used. Your personal data may be retained in certain files for a period of time as required by applicable law and following the Company’s data retention policies in order to comply with such financial or legal requirements, to properly resolve disputes or to troubleshoot problems.</li>
                            <li>In addition, some types of information may be stored for an infinite duration due to legal requirements or technical constraints, and will, if practical, be blocked from further processing for purposes which are not mandatory by law or when a consent is withdrawn. The information that you provide may be stored or transferred in our systems or on the systems provided by our third parties.</li>
                        </ol>
                    </div>
                </div>
                {/* =================sharing of information =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                         <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Sharing the information </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>Information about our customers is an important part of our business and we are not in the business of selling our customers’ personal information to others. We share customers’ personal information only as described below:</p>

                        <p>We shall share your information with third parties (including related companies and third party service providers) in furtherance of provisioning of our services through the website. We share your information with any third parties strictly on a need to know basis, subject to adequate confidentiality obligations on the transferee. Apart from this, we take reasonably necessary steps to ensure that the data is treated securely and in accordance with this Privacy Policy. Any transfer of your personal data with other organizations outside of the Company or a country is shared only subject to adequate controls in place including the security of the data, in the following circumstances:</p>
                        <ol>
                            <li>* Satisfy any applicable law, regulation, legal process or enforceable governmental request;</li>
                            <li>* Enforce applicable terms of use, including investigation of potential violations thereof;</li>
                            <li>* Detect, prevent, or otherwise address fraud, security or technical issues;</li>
                            <li>* Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                            <li>* Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
                            <li>* Using Third-Party Service Providers. We employ other companies and individuals to perform functions on our behalf. For example, fulfilling orders for products or services, delivering packages, analyzing data, providing marketing assistance, providing search results and links (including paid listings and links), processing payments, transmitting content, and providing customer service. These third-party service providers have access to personal information needed to perform their functions, but may not use it for other purposes. Further, they must process the personal information in accordance with applicable law.</li>
                            <li>* Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                            <li>* Affiliates. We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                            <li>* Business Partners. We may share your information with our business partners to offer you certain products, services or promotions.</li>
                        </ol>
                        <p>Other than as set out above, you will receive notice when personal information about you might be shared with third parties, and you will have an opportunity to choose not to share the information. The access to the Company servers is limited strictly to authorized personnel(s) and your information or data is shared with the employees and authorised personnel(s) on a ‘need to know basis’ to complete the transaction and to provide the services by you.</p>
                    </div>
                </div>
                {/* =================Cookie Note & Policy =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Cookie Note & Policy </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <ol className='list-decimal'>
                            <li>
                                To optimize our web presence, we use cookies. These are small text files stored on your computer’s main memory. These cookies are deleted after you close the browser. Other cookies remain on your computer (long-term cookies) and permit its recognition on your next visit. This allows us to improve your access to our site. This helps us to learn more about your interests, and provide you with essential features and services and for additional purposes, including:
                                <ol className='list-[lower-alpha] list-inside'>
                                    <li>Keeping track of items stores in your shopping basket. </li>
                                    <li>Conducting research and diagnostics to improve the content, products, and services. </li>
                                    <li>Preventing fraudulent activity. </li>
                                    <li>Improving security. </li>

                                </ol>
                                <p>Our cookies allow you to take advantage of some of our essential features. For instance, if you block or otherwise reject our cookie. You can prevent the storage of cookies by choosing a ‘disable cookies’ option in your browser settings. But this can limit the functionality of our services.</p>
                            </li>
                            <li>Approved third parties also may set cookies when you interact with our services.</li>
                            <li>Third parties include search engines, providers of measurement and analytics services, shipping companies, social media networks, and advertising companies.</li>
                            <li>Third parties use cookies in the process of delivering content, including ads relevant to your interests, to measure the effectiveness of their ads, and to perform services</li>

                        </ol>
                    </div>
                </div>
                {/* =================User Communication =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>User Communication </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>When you send email or other communication to us, we may retain those communications in order to process your inquiries, respond to your requests and improve our services.</p>
                    </div>
                </div>
                {/* =================Termination  =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Termination </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <ol className='list-decimal'>
                            <li>You or we may suspend or terminate your account or your use of this Website at any time, for any reason or for no reason. You are personally liable for any charges incurred through your account prior to termination. We reserve the right to change, suspend, or discontinue all or any aspects of this Website at any time without notice.</li>
                            <li>
                                Inactivity: We energize individuals to effectively log in and utilize when they enroll an account. To keep your account dynamic, be beyond any doubt to log in at slightest each 6 (six) months. Inactivity for 6 (six) months would result in termination of the account. Points / credits can be availed / utilized as long as your account is active and in good standing. Termination of the account and. thus thereby the Services shall cease your ability to utilize any credits / points accrued in the account and the same shall be deleted.
                            </li>
                        </ol>
                    </div>
                </div>
                {/* =================How long do we retain your information?  =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>How long do we retain your information? </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than 3 (three) months past the termination of the user’s account.
                            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                        </p>
                    </div>
                </div>
                {/* =================You are responsible for the information you provide =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>You are responsible for the information you provide </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>You may complete a registration process as part of your use of this Website which may include the creation of a username, password and/or other identification information. Any username, password and/or other identification information must be kept confidential by you and must not be disclosed to, or shared with, anyone.
                        </p>
                    </div>
                </div>
                {/* =================Security of your Information =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Security of your Information </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>Our systems are designed keeping your security and privacy in mind.</p>
                        <ol>
                            <li>* We work to protect the security of your personal information during transmission by using encryption protocols and software.</li>
                            <li>* We maintain physical, electronic, and procedural safeguards in connection with the collection, storage, processing, and disclosure of personal customer information.</li>
                            <li>* It is important for you to protect against unauthorized access to your password and to your computers, devices and applications. Be sure to sign off when finished using a shared computer.</li>
                        </ol>
                        <p>Our Website has stringent security practices and procedures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession, we adhere to strict security guidelines, protecting it against unauthorized access, disclosure, and destruction.</p>
                    </div>
                </div>
                {/* =================Rights of the users=================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Rights of the users </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <ol className='list-decimal'>
                            <li>Right to access and review data;</li>
                            <li>Right to get data rectified</li>
                            <li>Right to seek erasure of data </li>
                            <li> Right to withdraw consent</li>
                            <li> Option to the provider of data to not provide such data, prior to collection.</li>
                        </ol>
                        <p>If you wish to cancel your account or request that we no longer use your information to provide you services, contact us via the information above. We will respond to your request to access or delete your information within 30 days.</p>
                        <p>The information collected enables us to give you convenient access to our service offerings and products.</p>
                        <p>You hereby represent to the company that</p>
                        <ol>
                            <li>* The information you provide to the Company from time to time is and shall be authentic, correct, current and updated and you have all the rights, permissions and consents as may be required to provide such information to the Company.</li>
                            <li>* Your providing the information to Company’s consequent storage, collection, usage, transfer, access or processing of the same shall not be in violation of any third party agreement, laws, charter documents, judgments, orders and decrees.</li>

                        </ol>
                        <p>The Company shall not be liable with respect to any loss or damage sustained by reason of any disclosure (inadvertent or otherwise) of any data, if the same is either (a) required for sharing of information for purposes specified hereunder; or (b) was affected through no fault, act, or omission of the company.</p>
                    </div>
                </div>
                {/* =================Alerts=================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Alerts </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>The Company may alert the users by email, phone (through sms/call) or push-notifications to inform the users about new services offerings or other information which the Company feels might be useful for the users.</p>
                    </div>
                </div>
                {/* =================Account Protection=================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Account Protection </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>Your personal data are treated strictly confidential. To this purpose, the Company uses several security techniques including secure servers, firewalls and encryptions, as well as physical safeguard of the locations where the data are stored. We have in place appropriate administrative, technical, physical safeguards and security measures to protect the personal data you provide on this Website against accidental, unauthorized or unlawful loss, destruction, damage, alteration, access, disclosure or use and any other unlawful forms of processing. When we collect payment card details electronically, we use encryption coding.
                            In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below.
                        </p>
                    </div>
                </div>
                {/* =================Grievance officer=================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Grievance officer </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>If you have any questions or concerns about this Privacy Policy, or our practices with regards to your personal information, you may, at any time, contact our Grievance Officer <span className='font-bold'>Mr. Jaikishan Belwal</span> via email on <span className='font-bold'>support@foodsbay.com</span> OR call on <span className='font-bold'>+91-9999532041</span> directly in case of discrepancies, grievance or questions and suggestions concerning the data shared with the Company. The Grievance Officer shall address the grievances (if any) within 1 (One) month from the date of the receipt of such grievance. In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided.</p>
                    </div>
                </div>
                {/* =================Disclaimer =================== */}
                <div className=" rounded-lg shadow-md p-6">
                    <div className='flex items-center gap-1 text-xl mb-4'>
                        <ShieldAlert size={20} />
                        <h2 className=' font-medium'>Disclaimer  </h2>
                    </div>
                    <div className='flex flex-col gap-4 text-gray-700 pl-6'>
                        <p>We reserve the right to modify these policies at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the Website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>
                        <p>In no event will the Company be liable to you or to any other party for any indirect, special, consequential or punitive damages for or arising from any use of, or access to, the personal information and Sensitive Personal Information or any data submitted on our websites or any other or hyper linked website, including, without limitation, any loss of information or data, even if we may have been expressly advised of the possibility of such damages.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
