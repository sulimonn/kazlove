echo 'Building...'
npm run build

echo 'Deploying to server...'
scp -r build/* root@176.124.214.164:/var/www/html/

echo 'Done!'
