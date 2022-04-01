cd Challenge01FileUpload
dotnet restore
dotnet lambda package --configuration debug --framework netcoreapp3.1 --output-package ../output/Challenge01FileUpload.zip
cd ..

cd ./output
sls deploy
cd ..
