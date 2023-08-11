import React from "react";
import './styles/ShareCard.css';

import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon, WhatsappShareButton, WhatsappIcon
} from "react-share";

export default function ShareCard() {
    return (
        <div className='share-card'>
            <div className='share-card-title-container'>
                <h1 className='share-card-title'>Share:</h1>
            </div>
            <div className='share-card-buttons'>
                <FacebookShareButton url={window.location} hashtag="#RecipeRealm">
                    <FacebookIcon size={32} round/>
                </FacebookShareButton>
                <TwitterShareButton url={window.location} hashtags={['#RecipeRealm']}>
                    <TwitterIcon size={32} round/>
                </TwitterShareButton>
                <WhatsappShareButton url={window.location} title={document.title}>
                    <WhatsappIcon size={32} round/>
                </WhatsappShareButton>
            </div>
        </div>
    );
}