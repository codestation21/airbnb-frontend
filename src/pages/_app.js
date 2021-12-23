import {ThemeProvider} from 'theme-ui';
import theme from 'theme';
import {wrapper} from "redux/store";
import SimpleReactLightbox from 'simple-react-lightbox'

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={theme}>
            <SimpleReactLightbox>
                <Component {...pageProps} />
            </SimpleReactLightbox>
        </ThemeProvider>
    )
}

export default wrapper.withRedux(MyApp);
