#!/bin/bash

IMAGE_URI=$1

# Leggi il file CloudFormation e l'ambiente
origFile=$( cat ./infrastructure/aws/cloudformation.yaml )
input_string=$(cat ./infrastructure/envs/dev.txt)
IFS="="

# Sostituisci le variabili nel file CloudFormation
while read -r chiave valore;
do
    valore=$(echo $valore | sed  "s/\//\\\\\//g")
    echo "Sostituzione: Chiave: $chiave, Valore: $valore"
    origFile=$( sed  "s/{{$chiave}}/$valore/g" <<< "$origFile" )
done <<< "$input_string"

# Scrivi il file finale con le sostituzioni effettuate
echo "$origFile" > ./infrastructure/aws/cfn.yaml
echo "------------------- DUMP CLOUDFORMATION -----------------"
cat ./infrastructure/aws/cfn.yaml

echo "------------------- CREAZIONE DEL CHANGE SET ----------------"

echo "IMAGE_URI: $IMAGE_URI"

# Verifica se lo stack esiste già
stack_status=$(aws cloudformation describe-stacks --stack-name DDAIApiC4d --query 'Stacks[0].StackStatus' --output text 2>/dev/null)

# Se lo stack non esiste, crealo con un change set
if [ $? -eq 0 ]; then
    echo "Lo stack esiste già con lo stato: $stack_status"
    action="UPDATE"
    # Crea un nome univoco per il change set
    change_set_name="changeset-$(date +%Y%m%d%H%M%S)"
    aws cloudformation update-stack --stack-name DDAIApiC4d --template-body file://infrastructure/aws/cfn.yaml \
        --parameters ParameterKey=EcrImageUri,ParameterValue=${IMAGE_URI}  --capabilities CAPABILITY_NAMED_IAM

else
    echo "Lo stack non esiste, verrà creato."
    action="CREATE"
    aws cloudformation deploy \
          --stack-name DDAIApiC4d \
          --template-file ./infrastructure/aws/cfn.yaml \
          --parameter-overrides EcrImageUri=${IMAGE_URI} \
          --capabilities CAPABILITY_NAMED_IAM --no-fail-on-empty-changeset

fi

