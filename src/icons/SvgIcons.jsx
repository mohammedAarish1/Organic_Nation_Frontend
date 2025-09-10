const FacebookIcon = ({ color = "#1877F2" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill={color}
    >
        <path d="M22.675 0h-21.35C.597 0 0 .597 0 
      1.326v21.348C0 23.403.597 24 1.326 24h11.495V14.708h-3.13v-3.62h3.13V8.413c0-3.1 
      1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.505 
      0-1.797.715-1.797 1.763v2.31h3.59l-.467 3.62h-3.123V24h6.116C23.403 
      24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
    </svg>
);


const LinkedInIcon = ({ color = "#0A66C2" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill={color}
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 
      0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.048c.476-.9 
      1.637-1.852 3.37-1.852 3.601 0 4.266 2.37 4.266 
      5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 
      0-4.124 2.062 2.062 0 0 1 0 4.124zM6.921 
      20.452H3.752V9h3.169v11.452zM22.225 0H1.771C.792 
      0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 
      24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 
      .774 23.2 0 22.222 0z"/>
    </svg>
);


const InstagramIcon = ({ color = "url(#igGradient)" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
        viewBox="0 0 24 24" role="img" aria-label="Instagram">
        <defs>
            <linearGradient id="igGradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#FEDA75" />
                <stop offset="25%" stopColor="#FA7E1E" />
                <stop offset="50%" stopColor="#D62976" />
                <stop offset="75%" stopColor="#962FBF" />
                <stop offset="100%" stopColor="#4F5BD5" />
            </linearGradient>
        </defs>

        <rect x="3" y="3" width="18" height="18" rx="5"
            fill="none" stroke={color} strokeWidth="2.5" />

        <circle cx="12" cy="12" r="4.5"
            fill="none" stroke={color} strokeWidth="2.5" />

        <circle cx="17" cy="7" r="1.5" fill={color} />
    </svg>

)


const XIcon = ({ color = "#000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 16 16"
        fill={color}
    // aria-hidden={props["aria-label"] ? undefined : true}
    >
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
);


const YouTubeIcon = ({ background = "#FF0000", playButton = "#fff" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" role="img" aria-label="YouTube">
        <path fill={background} d="M23.498 6.186a2.99 2.99 0 0 0-2.106-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.392.566a2.99 2.99 0 0 0-2.106 2.12A31.18 31.18 0 0 0 .5 12a31.18 31.18 0 0 0 .002 5.814 2.99 2.99 0 0 0 2.106 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.392-.566a2.99 2.99 0 0 0 2.106-2.12A31.18 31.18 0 0 0 23.5 12a31.18 31.18 0 0 0-.002-5.814Z" />
        <path fill={playButton} d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
);


const LeftQuote = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={36}
        height={44}
        fill={color}
        className={className}
    ><path d="M96 280C96 213.7 149.7 160 216 160L224 160C241.7 160 256 174.3 256 192C256 209.7 241.7 224 224 224L216 224C185.1 224 160 249.1 160 280L160 288L224 288C259.3 288 288 316.7 288 352L288 416C288 451.3 259.3 480 224 480L160 480C124.7 480 96 451.3 96 416L96 280zM352 280C352 213.7 405.7 160 472 160L480 160C497.7 160 512 174.3 512 192C512 209.7 497.7 224 480 224L472 224C441.1 224 416 249.1 416 280L416 288L480 288C515.3 288 544 316.7 544 352L544 416C544 451.3 515.3 480 480 480L416 480C380.7 480 352 451.3 352 416L352 280z" /></svg>
)

const RightQuote = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={36}
        height={44}
        fill={color}
        className={className}
    ><path d="M544 360C544 426.3 490.3 480 424 480L416 480C398.3 480 384 465.7 384 448C384 430.3 398.3 416 416 416L424 416C454.9 416 480 390.9 480 360L480 352L416 352C380.7 352 352 323.3 352 288L352 224C352 188.7 380.7 160 416 160L480 160C515.3 160 544 188.7 544 224L544 360zM288 360C288 426.3 234.3 480 168 480L160 480C142.3 480 128 465.7 128 448C128 430.3 142.3 416 160 416L168 416C198.9 416 224 390.9 224 360L224 352L160 352C124.7 352 96 323.3 96 288L96 224C96 188.7 124.7 160 160 160L224 160C259.3 160 288 188.7 288 224L288 360z" /></svg>
)

export {
    FacebookIcon,
    LinkedInIcon,
    InstagramIcon,
    XIcon,
    YouTubeIcon,
    LeftQuote,
    RightQuote
};
