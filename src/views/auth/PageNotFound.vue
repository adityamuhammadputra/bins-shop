<template>
    <div class="section section-margin page-not-found">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="error_form">
                        <h1 class="title">404</h1>
                        <h2 class="sub-title">Opps! PAGE NOT BE FOUND</h2>
                        <p>Sorry but the page you are looking for does not exist, have been<br> removed, name changed or is temporarily unavailable.</p>
                        <form class="search-form-error mb-8" action="#">
                            <input class="input-text" placeholder="Search..." type="text">
                            <button class="submit-btn" type="submit"><i class="fa fa-search"></i></button>
                        </form>
                        <a href="/" class="btn btn-primary btn-hover-dark rounded-0">Back to home page</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.page-not-found {
    height: 1000px;
    position: fixed;
    z-index: 11111111;
    background: white;
    margin-top: 0;
    padding-top: 100px;
}
</style>