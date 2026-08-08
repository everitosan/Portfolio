dev-web:
	@. ${HOME}/.nvm/nvm.sh && nvm use && npx turbo run dev

dev-blog:
	@$(MAKE) -j2 dev-blog-pb dev-blog-astro

dev-blog-pb:
	@cd apps/blog/pocketbase_0.39.4_linux_amd64 && ./pocketbase serve

dev-blog-astro:
	@cd apps/blog && pnpm dev

deploy-web:
	@./utils/scripts/deploy-web.sh

deploy-blog:
	@./utils/scripts/deploy-blog.sh

	