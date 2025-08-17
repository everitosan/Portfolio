dev:
	@. ${HOME}/.nvm/nvm.sh && nvm use && npx turbo run dev

build:
	@./utils/scripts/build.sh

deploy:
	@./utils/scripts/deploy.sh

	