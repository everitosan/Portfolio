dev:
	@. ${HOME}/.nvm/nvm.sh && nvm use && npx turbo run dev

deploy-web:
	@./utils/scripts/deploy-web.sh

deploy-blog:
	@./utils/scripts/deploy-blog.sh

	