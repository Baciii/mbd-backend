import app from './app/index.js';
import CONFIG from './config/index.js';

app.listen(CONFIG.PORT, () => {
    console.log(`listening in ${CONFIG.PORT}`);
});
