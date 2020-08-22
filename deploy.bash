cd build/html
gsutil -h "Content-Type:text/html" cp -r .  gs://www.developer-cheatsheets.com
cd ../pdf
gsutil cp -r .  gs://www.developer-cheatsheets.com
cd ../../styles
gsutil -h "Content-Type:text/css" cp -r .  gs://www.developer-cheatsheets.com
cd ../scripts
gsutil -h cp -r .  gs://www.developer-cheatsheets.com
cd ../images
gsutil -h cp -r .  gs://www.developer-cheatsheets.com