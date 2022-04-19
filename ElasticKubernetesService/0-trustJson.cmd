FOR /F %%i IN ('aws sts get-caller-identity --query "Account" --output text') DO set ACCOUNT_ID=%%i

FOR /F %%j IN ('aws eks describe-cluster --name t3small-cluster --query "cluster.identity.oidc.issuer" --output text ^| sed -e "s/^https:\/\///"') DO set OIDC_PROVIDER=%%j

echo {>0-trust.json
echo "Version": "2012-10-17",>>0-trust.json
echo "Statement": [>>0-trust.json
echo     {>>0-trust.json
echo       "Effect": "Allow",>>0-trust.json
echo       "Principal": {>>0-trust.json
echo         "Federated": "arn:aws:iam::%ACCOUNT_ID%:oidc-provider/%OIDC_PROVIDER%">>0-trust.json
echo       },>>0-trust.json
echo       "Action": "sts:AssumeRoleWithWebIdentity",>>0-trust.json
echo       "Condition": {>>0-trust.json
echo         "StringEquals": {>>0-trust.json
echo           "%OIDC_PROVIDER%:aud": "sts.amazonaws.com",>>0-trust.json
echo           "%OIDC_PROVIDER%:sub": "system:serviceaccount:kube-system:cluster-autoscaler">>0-trust.json
echo         }>>0-trust.json
echo       }>>0-trust.json
echo     }>>0-trust.json
echo   ]>>0-trust.json
echo }>>0-trust.json