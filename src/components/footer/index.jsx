import './index.scss'
import React, { Component } from 'react';

const Footer = () => {


    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 border-top bg-primary" >
            <div className="col-md-4 d-flex align-items-center ">
                <span className="text-white mx-4"> © 2022 Digital Booking</span>
            </div>

            <ul className="nav d-none d-md-flex justify-content-end list-unstyled p-2 me-2">
                <li className="ms-3 "><a className="text-muted" href="#"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 13.5821C28 6.07911 21.7339 0 14 0C6.26613 0 0 6.07911 0 13.5821C0 20.3612 5.1196 25.9802 11.8125 27V17.5084H8.25605V13.5821H11.8125V10.5897C11.8125 7.18594 13.9012 5.3058 17.1003 5.3058C18.6324 5.3058 20.2345 5.57087 20.2345 5.57087V8.91164H18.4687C16.73 8.91164 16.1875 9.95878 16.1875 11.0328V13.5821H20.0702L19.4493 17.5084H16.1875V27C22.8804 25.9802 28 20.3612 28 13.5821Z" fill="white" />
                </svg>
                </a></li>
                <li className="ms-3"><a className="text-muted" href="#"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.37214 24H0.396429V7.97643H5.37214V24ZM2.88161 5.79066C1.29054 5.79066 0 4.47278 0 2.88167C1.13882e-08 2.1174 0.303597 1.38444 0.844003 0.844022C1.38441 0.303604 2.11736 0 2.88161 0C3.64586 0 4.3788 0.303604 4.91921 0.844022C5.45962 1.38444 5.76321 2.1174 5.76321 2.88167C5.76321 4.47278 4.47214 5.79066 2.88161 5.79066ZM23.9946 24H19.0296V16.1998C19.0296 14.3409 18.9921 11.9569 16.4427 11.9569C13.8557 11.9569 13.4593 13.9766 13.4593 16.0659V24H8.48893V7.97643H13.2611V10.1622H13.3307C13.995 8.90323 15.6177 7.57463 18.0386 7.57463C23.0743 7.57463 24 10.8908 24 15.198V24H23.9946Z" fill="white" />
                </svg>
                </a></li>
                <li className="ms-3"><a className="text-muted" href="#"><svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5331 5.48279C21.5483 5.72341 21.5483 5.96407 21.5483 6.20469C21.5483 13.5437 16.5991 22 7.55333 22C4.7665 22 2.17768 21.089 0 19.5078C0.395955 19.5594 0.776628 19.5766 1.18782 19.5766C3.48728 19.5766 5.60407 18.7 7.29444 17.2047C5.13199 17.1531 3.31979 15.5547 2.69542 13.3547C3.00001 13.4062 3.30456 13.4406 3.62439 13.4406C4.066 13.4406 4.50766 13.3718 4.9188 13.2516C2.66499 12.7359 0.974582 10.5016 0.974582 7.80312V7.73439C1.62938 8.14689 2.39087 8.4047 3.19792 8.43904C1.87304 7.44214 1.00505 5.7406 1.00505 3.81559C1.00505 2.78436 1.24866 1.83904 1.67508 1.01404C4.09642 4.38278 7.73605 6.58275 11.8172 6.82341C11.7411 6.41091 11.6954 5.98127 11.6954 5.55157C11.6954 2.49216 13.8883 0 16.6142 0C18.0304 0 19.3096 0.670311 20.2081 1.75312C21.3198 1.51251 22.3858 1.04843 23.33 0.412503C22.9644 1.70159 22.1878 2.78441 21.1675 3.47186C22.1574 3.35161 23.1168 3.04216 24 2.61252C23.3301 3.71247 22.4924 4.69212 21.5331 5.48279Z" fill="white" />
                </svg>
                </a></li>
                <li className="ms-3"><a className="text-muted" href="#"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5028 5.8467C8.95566 5.8467 6.09453 8.594 6.09453 12C6.09453 15.406 8.95566 18.1533 12.5028 18.1533C16.0499 18.1533 18.911 15.406 18.911 12C18.911 8.594 16.0499 5.8467 12.5028 5.8467ZM12.5028 16.0004C10.2105 16.0004 8.33659 14.2064 8.33659 12C8.33659 9.7936 10.205 7.99955 12.5028 7.99955C14.8006 7.99955 16.669 9.7936 16.669 12C16.669 14.2064 14.795 16.0004 12.5028 16.0004ZM20.6679 5.595C20.6679 6.39295 19.9986 7.03024 19.1732 7.03024C18.3422 7.03024 17.6785 6.38759 17.6785 5.595C17.6785 4.80241 18.3477 4.15977 19.1732 4.15977C19.9986 4.15977 20.6679 4.80241 20.6679 5.595ZM24.9122 7.05166C24.8173 5.12909 24.36 3.42608 22.8932 2.02298C21.432 0.619882 19.6584 0.180743 17.6562 0.0843468C15.5926 -0.0281156 9.40742 -0.0281156 7.34384 0.0843468C5.34718 0.175388 3.57362 0.614526 2.1068 2.01763C0.639989 3.42073 0.188232 5.12373 0.0878416 7.0463C-0.0292805 9.02778 -0.0292805 14.9669 0.0878416 16.9483C0.182655 18.8709 0.639989 20.5739 2.1068 21.977C3.57362 23.3801 5.34161 23.8193 7.34384 23.9157C9.40742 24.0281 15.5926 24.0281 17.6562 23.9157C19.6584 23.8246 21.432 23.3855 22.8932 21.977C24.3544 20.5739 24.8118 18.8709 24.9122 16.9483C25.0293 14.9669 25.0293 9.03314 24.9122 7.05166ZM22.2462 19.0744C21.8112 20.1241 20.969 20.9327 19.8703 21.3558C18.225 21.9824 14.321 21.8378 12.5028 21.8378C10.6846 21.8378 6.77496 21.977 5.13525 21.3558C4.04211 20.9381 3.19994 20.1294 2.75934 19.0744C2.1068 17.4946 2.25739 13.7458 2.25739 12C2.25739 10.2542 2.11238 6.50006 2.75934 4.92558C3.19437 3.87593 4.03653 3.06728 5.13525 2.6442C6.78054 2.01763 10.6846 2.16222 12.5028 2.16222C14.321 2.16222 18.2306 2.02298 19.8703 2.6442C20.9635 3.06192 21.8056 3.87058 22.2462 4.92558C22.8988 6.50541 22.7482 10.2542 22.7482 12C22.7482 13.7458 22.8988 17.4999 22.2462 19.0744Z" fill="white" />
                </svg>
                </a></li>
            </ul>
        </footer>
    )
}

export default Footer;



