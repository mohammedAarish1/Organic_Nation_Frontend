const FacebookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill="#1877F2"
    >
        <path d="M22.675 0h-21.35C.597 0 0 .597 0 
      1.326v21.348C0 23.403.597 24 1.326 24h11.495V14.708h-3.13v-3.62h3.13V8.413c0-3.1 
      1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.505 
      0-1.797.715-1.797 1.763v2.31h3.59l-.467 3.62h-3.123V24h6.116C23.403 
      24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
    </svg>
);


const LinkedInIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill="#0A66C2"
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


const InstagramIcon = () => (
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
            fill="none" stroke="url(#igGradient)" strokeWidth="2.5" />

        <circle cx="12" cy="12" r="4.5"
            fill="none" stroke="url(#igGradient)" strokeWidth="2.5" />

        <circle cx="17" cy="7" r="1.5" fill="url(#igGradient)" />
    </svg>



)

const XIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 16 16"
        fill="#000"
    // aria-hidden={props["aria-label"] ? undefined : true}
    >
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
);


const YouTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
        viewBox="0 0 24 24" role="img" aria-label="YouTube">
        <path fill="#FF0000" d="M23.498 6.186a2.99 2.99 0 0 0-2.106-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.392.566a2.99 2.99 0 0 0-2.106 2.12A31.18 31.18 0 0 0 .5 12a31.18 31.18 0 0 0 .002 5.814 2.99 2.99 0 0 0 2.106 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.392-.566a2.99 2.99 0 0 0 2.106-2.12A31.18 31.18 0 0 0 23.5 12a31.18 31.18 0 0 0-.002-5.814Z" />
        <path fill="#fff" d="M9.75 15.5v-7l6 3.5-6 3.5Z" />
    </svg>

)

export {
    FacebookIcon,
    LinkedInIcon,
    InstagramIcon,
    XIcon,
    YouTubeIcon
};
