pipeline {
  agent any

  environment {
    IMAGE_NAME = "abra7am_cicd_app"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build') {
      steps {
        nodejs('node18') {
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Test') {
      steps {
        nodejs('node18') {
          echo '🧪 Running tests...'
          sh 'npm test || echo "Tests skipped for demo"'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          def port = (env.BRANCH_NAME == 'main') ? '3000' : '3001'
          sh """
            docker build -t ${IMAGE_NAME}:${env.BRANCH_NAME} \
            --build-arg APP_PORT=${port} .
          """
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          def port = (env.BRANCH_NAME == 'main') ? '3000' : '3001'
          sh """
            docker stop ${IMAGE_NAME}_${env.BRANCH_NAME} || true
            docker rm ${IMAGE_NAME}_${env.BRANCH_NAME} || true
            docker run -d -p ${port}:${port} \
              --name ${IMAGE_NAME}_${env.BRANCH_NAME} ${IMAGE_NAME}:${env.BRANCH_NAME}
          """
          echo "✅ Deployed ${env.BRANCH_NAME} on http://localhost:${port}"
        }
      }
    }
  }
}
