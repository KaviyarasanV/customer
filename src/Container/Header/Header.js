import React from 'react';

const Header = () => {

    return (
        <header class="navbar navbar-expand-lg navbar-light" id="navbar">
            <div class="container" >
                <div class="hero__search__phone__icon" >
                    <i class="fa fa-home " aria-hidden="true"></i>
                </div>
                <div class="hero__search">
                    <div class="hero__search__phone">
                        <div class="hero__search__phone__icon">
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        <div class="hero__search__phone__text">
                            <h5>999 4440 444 </h5>
                            <span>support 24/7 time</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;