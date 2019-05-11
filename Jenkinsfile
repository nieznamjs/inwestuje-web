pipeline {
    agent none

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws-access-key')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    }

    stages {
        stage('Build and Test') {
            agent {
                docker { image 'node:10-alpine' }
            }
            stages {
                stage('Build') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('Test') {
                    steps {
                        sh 'npm run test:ci'
                    }
                }
            }
        }

        stage('Publish and Deploy image') {
            agent any
            stages {
                stage('Publish') {
                    steps {
                        sh "\$(aws ecr get-login --region eu-west-1 --no-include-email)"
                        sh "docker tag inwestuje-web:latest 130063139515.dkr.ecr.eu-west-1.amazonaws.com/inwestuje-web:latest"
                        sh "docker push 130063139515.dkr.ecr.eu-west-1.amazonaws.com/inwestuje-web"
                    }
                }
            }
        }
    }
}
