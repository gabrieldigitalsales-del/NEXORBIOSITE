-- Dados iniciais opcionais. Execute depois do schema.sql se quiser começar com conteúdo pronto.

insert into public.hero_slides (tag, title, highlight, "desc", cta, wamsg, bg_color, "order", active)
values ('Biosite', 'Transforme sua bio do Instagram em uma', 'vitrine de vendas', 'Seu negócio ganha um biosite moderno para seus clientes acessarem produtos e chamarem direto no WhatsApp.', 'Quero meu biosite', 'Olá%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.', 'from-amber-50 to-orange-50', 1, true)
on conflict do nothing;

insert into public.services (tag, title, "desc", features, wamsg, bg_color, badge_color, icon_name, "order", active)
values
('Biosite', 'Biosite para Instagram', 'Um link único e moderno para colocar na bio do Instagram.', array['Link para bio','Catálogo organizado','Botão WhatsApp','Identidade visual','Mobile-first'], 'Olá%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.', 'from-amber-50 to-orange-50', 'bg-amber-100 text-amber-700', 'LayoutGrid', 1, true),
('Social Media', 'Gestão de Social Media', 'Cuidamos das suas redes sociais do início ao fim.', array['Planejamento mensal','Criação de artes','Legendas estratégicas','Gerenciamento de perfis'], 'Olá%2C%20quero%20saber%20mais%20sobre%20Social%20Media%20com%20a%20NEXOR.', 'from-rose-50 to-pink-50', 'bg-rose-100 text-rose-700', 'Instagram', 2, true)
on conflict do nothing;

insert into public.faq_items (question, answer, "order", active)
values
('O biosite funciona no Instagram?', 'Sim. Você recebe um link para colocar na bio do Instagram, nos stories, no WhatsApp ou em qualquer rede social.', 1, true),
('O cliente consegue comprar direto pelo biosite?', 'O cliente escolhe os produtos e envia o pedido pelo WhatsApp, facilitando o atendimento e a finalização da venda.', 2, true),
('Preciso ter loja virtual?', 'Não. O biosite é ideal para quem quer vender de forma simples, sem precisar de uma loja virtual complexa.', 3, true)
on conflict do nothing;

insert into public.plan_items (name, featured, features, "order", active)
values
('Essencial', false, array['Biosite personalizado','Botão para WhatsApp','Links de redes sociais','Entrega rápida'], 1, true),
('Profissional', true, array['Tudo do Essencial','Catálogo de produtos','Seções personalizadas','Otimização mobile'], 2, true),
('Premium', false, array['Tudo do Profissional','Landing page completa','Suporte prioritário','Ajustes estratégicos'], 3, true)
on conflict do nothing;
