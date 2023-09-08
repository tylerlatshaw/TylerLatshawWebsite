import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Column,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Row,
    Tailwind,
    Font,
} from '@react-email/components';
import { unsubscribe } from 'diagnostics_channel';
import * as React from 'react';

const baseUrl = 'localhost:3001';

export const EmailTemplate = () => (
    <Html>
        <Head />
        <Preview>Exciting News: My website is now LIVE!&nbsp;🎉</Preview>
        <Body style={main}>
            <Tailwind>
                <Section style={header}>
                    <Img
                        style={imgHeader}
                        src={`https://tylerlatshaw.com/_next/static/media/gradient-logo-animated.a32fad62.svg`}
                        width={300}
                        alt="codepen"
                        className="pt-8 pb-8"
                    />
                </Section>
                <Container style={container}>
                    <Heading style={heading}>
                        Exciting News: My website is now <strong>LIVE</strong>!&nbsp;🎉
                    </Heading>

                    <Section style={mainSection}>
                        <Text style={text}>Hello there!</Text>

                        <Text style={text}>
                            I hope this email finds you well. I have some exciting news to share - my brand-new website is officially live!
                        </Text>

                        <Text style={text}>
                            You can view the new site at <Link href="https://tylerlatshaw.com/">https://tylerlatshaw.com/</Link>
                        </Text>

                        <Text style={text}>I couldn't be more thrilled to invite you to explore my new website - I am humbled that you requested to be notified when it goes live. I have worked hard on the site over the past few months, teaching myself Next.js along the way! Some things you can expect:</Text>

                        <Text style={text}>Some things you can expect:</Text>

                        <Text style={text}>
                            ✨ <strong>New Design:</strong>{' '}I've rewritten my entire website from the ground up. It features a visually-appealing design that is intuitive to use.
                        </Text>

                        <Text style={text}>
                            📰 <strong>All New Content:</strong>{' '}I updated my portfolio to include more relavent information and examples of my work and even included a few pages so you can get to know me personally.
                        </Text>

                        <Text style={text}>
                            📱 <strong>User-Focused Interaction:</strong>{' '}My new website is built with the user experience in mind. I designed the site to be completely mobile friendly and easy to use.
                        </Text>

                        <Section style={alignCenter}>
                            <Button style={button} pX={12} pY={12} href="https://tylerlatshaw.com/">
                                Visit My Site Now
                            </Button>
                        </Section>

                        <Text style={text}>
                            Thank you for your support as I navigate creating my online portfolio. I cannot wait to hear what you think!
                        </Text>

                        <Text style={text}>
                            - Tyler
                        </Text>

                        <Img
                            src={`${baseUrl}/static/signature.png`}
                            width={600}
                            alt="codepen"
                        />

                        <Section style={callToAction}>
                            <Text style={ctaHeader}>
                                Get in Contact
                            </Text>
                            <Link href='mailto:tyler@tylerlatshaw.com' style={link}>tyler@tylerlatshaw.com</Link><br/>
                            <Link href='https://www.linkedin.com/in/tylerlatshaw/' style={link}>Connect With Me On LinkedIn</Link>
                        </Section>

                    </Section>
                    <Text style={disclaimer}>
                        You are receiving this message because you requested to know when my site goes live.
                    </Text>


                    <Text style={footerLinkSection}>
                        <Link style={link} href="${baseUrl}/resume">Resume</Link> |{' '}
                        <Link style={link} href="${baseUrl}/portfolio">Portfolio</Link> |{' '}
                        <Link style={link} href="${baseUrl}/interests">Interests</Link> |{' '}
                        <Link style={link} href="${baseUrl}/contact-me">Contact Me</Link> |{' '}
                        <Link style={link} href="${baseUrl}/privacy-policy">Privacy Policy</Link>
                    </Text>

                    <Text style={unsubscribeFooter}>
                        Don't want to receieve future updates? Reply with "Unsubscribe" in the subject line.
                    </Text>
                </Container>
            </Tailwind>
        </Body>
    </Html>
);

export default EmailTemplate
    ;

const main = {
    fontFamily: '"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
    fallbackFontFamily: "Verdana",
    backgroundColor: '#505050',
    margin: '0',
};

const imgHeader = {
    margin: 'auto',
};

const header = {
    width: '100%',
    backgroundColor: '#191919',
    margin: '0 auto',
    zIndex: '999',
};

const container = {
    paddingLeft: '12px',
    paddingRight: '12px',
    margin: '0 auto 16px auto',
    width: '648px',
    maxWidth: '648px',
    position: 'relative' as const
};

const heading = {
    background: '#233441',
    padding: '30px',
    color: 'white',
    textAlign: 'center' as const,
    fontWeight: '400',
    marginTop: '0',
    marginBottom: '0'
};

const mainSection = {
    margin: '0',
    background: 'white',
    padding: '0 24px',
    marginTop: '0',
    marginBottom: '0'
};

const text = {
    fontSize: '16px',
    color: 'black'
};

const alignCenter = {
    textAlign: 'center' as const
};

const callToAction = {
    marginTop: '24px',
    marginBottom: '24px',
    textAlign: 'center' as const,
    background: '#234130',
    color: 'white',
    padding: '32px 24px 32px 24px',
    border: '6px solid #191919'
};

const ctaHeader = {
    fontSize: '22px',
    margin: '0 0 24px 0'
};

const button = {
    background: '#2138c6',
    color: '#fff',
    border: '0',
    fontSize: '15px',
    lineHeight: '18px',
    cursor: 'pointer',
    borderRadius: '4px'
};

const disclaimer = {
    backgroundColor: '#696969',
    color: 'white',
    textAlign: 'center' as const,
    padding: '12px 0 12px 0',
    fontSize: '14px',
    width: '100%',
    maxWidth: '648px',
    margin: '0 0 16px 0',
    marginBottom: '0'
};

const footerLinkSection = {
    background: '#233441',
    textAlign: 'center' as const,
    padding: '24px',
    fontSize: '14px',
    color: 'white',
    marginTop: '0',
    marginBottom: '0'
};

const link = {
    color: 'white',
    textDecoration: 'underline',
    margin: '0 2px'
};

const unsubscribeFooter = {
    fontSize: '14px',
    textAlign: 'center' as const,
    color: '#1a1a1a'
};