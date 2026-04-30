-- Dados iniciais opcionais do NEXOR Biosite.
-- Execute depois do schema.sql.

insert into nexor_biosite.hero_slides (tag, title, highlight, "desc", cta, wamsg, image_url, bg_color, "order", active)
values
('Biosite', 'Transforme sua bio do Instagram em uma', 'vitrine de vendas', 'Seu negocio ganha um biosite moderno para seus clientes acessarem produtos e chamarem direto no WhatsApp.', 'Quero meu biosite', 'Ola%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.', '/assets/hero-mockup.svg', 'from-amber-50 to-orange-50', 1, true),
('Digital', 'Organize seus servicos em um site', 'rapido e profissional', 'Apresente seus links, ofertas e contatos em uma experiencia simples, bonita e preparada para converter.', 'Quero meu site', 'Ola%2C%20quero%20um%20site%20profissional%20com%20a%20NEXOR.', '/assets/hero-mockup.svg', 'from-orange-50 to-yellow-50', 2, true),
('Vendas', 'Leve seus clientes direto para o', 'WhatsApp', 'Facilite o atendimento com chamadas claras, carrossel editavel e estrutura pronta para crescer junto com seu negocio.', 'Falar no WhatsApp', 'Ola%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais.', '/assets/hero-mockup.svg', 'from-stone-50 to-amber-50', 3, true)
on conflict do nothing;

insert into nexor_biosite.services (tag, title, "desc", features, wamsg, bg_color, badge_color, icon_name, "order", active)
values
('Biosite', 'Biosite para Instagram', 'Um link unico e moderno para colocar na bio do Instagram.', array['Link para bio','Catalogo organizado','Botao WhatsApp','Identidade visual','Mobile-first'], 'Ola%2C%20quero%20criar%20meu%20biosite%20com%20a%20NEXOR.', 'from-amber-50 to-orange-50', 'bg-amber-100 text-amber-700', 'LayoutGrid', 1, true),
('Social Media', 'Gestao de Social Media', 'Cuidamos das suas redes sociais do inicio ao fim.', array['Planejamento mensal','Criacao de artes','Legendas estrategicas','Gerenciamento de perfis'], 'Ola%2C%20quero%20saber%20mais%20sobre%20Social%20Media%20com%20a%20NEXOR.', 'from-rose-50 to-pink-50', 'bg-rose-100 text-rose-700', 'Instagram', 2, true)
on conflict do nothing;

insert into nexor_biosite.faq_items (question, answer, "order", active)
values
('O biosite funciona no Instagram?', 'Sim. Voce recebe um link para colocar na bio do Instagram, nos stories, no WhatsApp ou em qualquer rede social.', 1, true),
('O cliente consegue comprar direto pelo biosite?', 'O cliente escolhe os produtos e envia o pedido pelo WhatsApp, facilitando o atendimento e a finalizacao da venda.', 2, true),
('Preciso ter loja virtual?', 'Nao. O biosite e ideal para quem quer vender de forma simples, sem precisar de uma loja virtual complexa.', 3, true)
on conflict do nothing;

insert into nexor_biosite.plan_items (name, featured, features, "order", active)
values
('Essencial', false, array['Biosite personalizado','Botao para WhatsApp','Links de redes sociais','Entrega rapida'], 1, true),
('Profissional', true, array['Tudo do Essencial','Catalogo de produtos','Secoes personalizadas','Otimizacao mobile'], 2, true),
('Premium', false, array['Tudo do Profissional','Landing page completa','Suporte prioritario','Ajustes estrategicos'], 3, true)
on conflict do nothing;
