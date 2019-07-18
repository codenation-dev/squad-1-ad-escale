# PETCODES

**Objetivo:**  
Plataforma web para publicação e busca de animais perdidos, achados ou disponíveis para adoção.  
  
**Contextualização:**  
Milhares de cães, gatos e outros animais são perdidos e encontrados todos os anos no 
Brasil e agora seu squad é responsável por criar a mais nova solução para ajudar na resolução desse problema.  
  
**Informações adicionais:**  
Com exceção dos requisitos técnicos obrigatórios, as funcionalidades e seus atributos podem ser alterados livremente por cada squad,
desde que as alterações sejam justificáveis. 
Exemplos: tempo de desenvolvimento, nova ideia que facilite o uso pelo usuário, complexidade, etc.

**Requisitos técnicos obrigatórios:**  
- Banco de Dados;
- Desenvolvimento de Backend - Python;
- Desenvolvimento de API - Python;
- Desenvolvimento de Frontend (utilizando de framework React).
- Funcionalidades

Cada squad tem liberdade para definir a linha de desenvolvimento de seus produtos,
porém levem em consideração algumas sugestões levantadas abaixo:  
- **Mobile first:**  Lembrem-se, a grande maioria dos seus usuários tentarão usar seu produto pelo celular, portanto,
caprichem para que eles tenham uma boa experiência de uso no mobile;  
- **Foco em resolver problemas:**  ter milhares de botões ou funcionalidades malucas não significa mais valor para seus usuários, logo,
o foco é resolver;  
- **MVP e evolução incremental:**  Para evitar que, ao final do Acelera Dev, seu squad não consiga colocar uma solução funcional no ar,
trabalhe com soluções incrementais.  Defina, desenvolva, lance e, a partir disso e de interações, aperfeiçoe a sua solução aos poucos.

#### CADASTRO 

**Atributos:**  
+ Nome;
+ E-mail;
+ Senha;
+ Repetir a senha;  

Fluxo e ações esperadas: Qualquer usuário poderá navegar pela plataforma, porém, para adicionar ou editar informações,
precisará criar um cadastro de usuário nela.  

##### Inspirações:
<https://www.uplabs.com/search?q=sign%20up>  
<https://www.uplabs.com/search?q=register>  
<https://www.uplabs.com/search?q=social%20login>    

##### Dicas e outras informações:
Caso o squad tenha interesse, poderá também usar cadastro/login utilizando redes sociais que possuem APIs, como Facebook e Google.

**Links úteis:**  
+ Login com Google: <https://developers.google.com/identity/sign-in/web/sign-in>
+ Login com Facebook: <https://developers.facebook.com/docs/facebook-login?locale=pt_B R>
+ Login social com Auth0: <https://auth0.com/learn/social-login/>  

#### AUTENTICAÇÃO/LOGIN

**Atributos:**  
+ E-mail;
+ Senha;
+ Links (ou botões)para redefinir senha e cadastro;  

Fluxo e ações esperadas: aplicar um processo de autenticação simples, por meio do qual usuários 
possam acessar determinadas funcionalidades da plataforma utilizando e-mail e senha.  

**Inspirações:**  
<https://www.uplabs.com/search?q=login>  
<https://www.uplabs.com/search?q=social%20login>  

##### Dicas e outras informações:
Lembrem-se de contemplar erros e fluxos diferentes do usual que podem ocorrer por parte dos usuários, 
como inserção errada de senha, diferenciação de letras maiúsculas e minúsculas, etc.  

#### ESQUECI MINHA SENHA

**Atributos:**  
+ E-mail - na tela para solicitar redefinição de senha;  
+ Senha - na tela para criar uma nova senha;  

Fluxo e ações esperadas: usuário insere endereço de e-mail para redefinir senha e recebe um e-mail com as instruções 
para redefinição e link para direcioná-lo à tela onde ele inserirá a nova senha.  

**Inspirações:**  

<https://www.uplabs.com/search?q=forget%20password>  

##### Dicas e outras informações:
Lembrem-se de analisar a segurança do processo de redefinição de senha.  

#### MAIN PAGE - BUSCA DE PETS

**Atributos:** Página com lista de pets nas seguintes categorias:  
+ Achados – para pets que possivelmente tenham donos e tenham sido encontrados nas ruas;
+ Perdidos – para pets que fugiram ou foram roubados, e possuem uma família à procura deles;
+ Adoção – para pets resgatados das ruas ou de situação de maus tratos e que estão à espera de um lar.
+ Exemplos de filtros e pesquisas que podem ser explorados (a critério do squad);
+ Espécie de pet – cachorro, gato, rato, cavalo, papagaio, etc;
+ Porte - pequeno, médio, grande;
+ Sexo - macho, fêmea;
+ Data da postagem - período que o animal foi postado (exemplo: de 13⁄10-15⁄10);
+ Categoria - achados, perdidos, adoção;
+ Localização - filtro por cidade, estado, distância, ou outras formas que julgarem interessantes;
+ Nome - busca por nome do pet;  

As informações de cada pet que serão mostradas na página principal ficam a critério do squad.
Fluxo e ações esperadas: Ao acessar o site, o usuário deverá conseguir navegar entre as categorias descritas,
filtrar pets quando necessário, acessar mais informações dos pets, criar cadastro e realizar login.  

**Inspirações:**  
<https://www.petfinder.com/>  
<https://www.adoptapet.com/dog-adoption>  
<https://www.petsmartcharities.org/adopt-a-pet/find-a-pet>  
<http://petango.com/>  
<https://www.puppyfi.com/anuncios>  
<http://www.adotebicho.com.br/>  

##### Dicas e outras informações:
Esta é uma das telas mais importantes da plataforma, portanto busquem construir uma experiência agradável e fácil para seus usuários.  
Busquem exemplos e inspirações e lembrem-se: nem sempre as inspirações precisam vir de plataformas concorrentes.  
Exemplos: AirBnB ou App Store podem servir de inspirações para o projeto, em especial ao analisarmos o fluxo de busca
e navegação para acessar determinado app (App Store) ou hospedagem ( AirBnB).  

#### PÁGINA DO PET

**Atributos:**  
+ Informações do pet- apresentar as informações cadastradas sobre o pet;
+ Comentários - não obrigatório, porém uma boa sugestão é permitir que as pessoas comentem na página do pet.
Para não precisar criar uma funcionalidade de comentários do zero, uma boa opção é o uso do Disqus, 
um plugin muito usado em páginas da internet, veja esse exemplo em uso.
+ Compartilhamento social - item também não obrigatório, porém boa alternativa para compartilhamento rápido através de botões 
para compartilhar em WhatsApp, Facebook, Twitter, etc.

**Fluxo e ações esperadas:**  Página que permita visualizar os dados do pet.  
**Inspirações:**  Busquem exemplos em e-commerces e outras plataformas que possam apresentar informações detalhadas sobre 
determinado item. 
Exemplo: Webmotors, Mercado Livre, Americanas.com, etc.  
Dicas e outras informações: lembrem de pensar na hierarquia das informações, quais devem ter mais relevância frente às outras.  

#### PERFIL & CONFIGURAÇÕES

**Atributos:**  
+ Editar Perfil - permitir edição dos dados cadastrados;
+ Adicionar Pet - permitir adicionar pets por essa página (fica a critério do squad adicionar essa ação em outras páginas da plataforma, caso julguem importante);
+ Visualizar Pets - visualizar lista de pets cadastrados pelo usuário;
+ Editar Pets - permitir a edição de pets cadastrados pelo usuário.
+ Fluxo e ações esperadas: página que permita alterações de dados pessoais, gestão de animais cadastrados, etc.
+ Inspirações: busquem exemplos em apps e plataformas que permitam adicionar e excluir itens e que tenham perfil, como Mercado Livre, AirBnB, etc.
+ Dicas e outras informações: caso desejem, outras funcionalidades e detalhes podem ser adicionados nessa página, porém levem sempre em consideração o que o usuário estará buscando ao acessar essa página.

####ADICIONAR PET

**Atributos:**  
+ Foto(s) do animal - podendo ser uma ou mais fotos, sendo a critério do squad;
+ Tipo de pet – cachorro, gato, rato, cavalo, papagaio, etc;
+ Porte - pequeno, médio, grande;
+ Sexo - macho, fêmea;
+ Categoria - achados, perdidos, adoção;
+ Localização - localização do pet;
+ Descrição - informações adicionais sobre o pet;
+ Contato - e-mail, telefone, ou outra forma de contato que o squad definir;  

**Fluxo e ações esperadas:** Permitir que o usuário possa adicionar novos pets na plataforma.  
**Inspirações:**  
<https://www.uplabs.com/search?q=adoption>
<https://www.uplabs.com/search?q=add>  

**Dicas e outras informações:**  Lembrem-se de considerar diferentes fluxos de navegação, 
como por exemplo: usuários não logados, logados, através da página principal, vindos de outras páginas, etc.  

#### EDITAR/EXCLUIR PET

**Atributos:**
+ Excluir - excluir pet da plataforma;
+ Editar - alterar informações previamente cadastradas para determinado pet;
+ Alterar status - para metrificar a evolução dos resultados da plataforma, adicione diferentes status para cada categoria;
+ Sugestões;
+ Encontrados: Achei meu dono ou Estou procurando meu dono e Fui adotado por um novo dono;
+ Procura-se: Encontrei meu pet e Estou à procura;
+ Adoção: Adotado e Para adotar;  

**Fluxo e ações esperadas:**  Permitir que usuários excluam ou editem pets cadastrados por eles.  
**Inspirações:**  Busquem exemplos em apps e plataformas que permitam adicionar e excluir itens, como Mercado Livre, OLX, AirBnB, etc.  
**Dicas e outras informações:**  Pensem em formas que facilitem alterações de status ou edições nos pets.  

#### OUTRAS FUNCIONALIDADES
Cada squad tem total liberdade para pensar em novas funcionalidades ou upgrades em outras funcionalidades já descritas neste documento,
porém considerem os prazos e a qualidade da entrega.  

##### Sobre a apresentação do projeto
Para que todos do grupo tenham a chance de apresentar seu trabalho, a apresentação deve ser feita de forma individual.  
Vocês podem ensaiar juntos, fazer um roteiro parecido, mas é importante que cada participante faça sua própria gravação.  

**Objetividade é muito importante**  Falem naturalmente e sem ler, por favor! :)  
Recomendamos que você faça um video-call e gravem este call. Assim, poderão ficar à vontade para 
compartilhar a tela e mostrar o código ou qualquer outra coisa importante. 
**__O vídeo deve ter no máximo 10 minutos.__**  

**Segue uma sugestão de roteiro:**  

Apresentação pessoal  
“Oi, pessoal…, eu me chamo _____ e vou apresentar para vocês o projeto final 
que fiz com a squad ______(número e nome) da Aceleração _______ da Codenation.”  

Apresentação do projeto  

Os membros da squad;  
Descrição do projeto e desenvolvimento do processo que a squad utilizou para resolver o problema;  
Divisão de tarefas entre os membros da squad e quais foram suas principais responsabilidades;  
Tecnologias utilizadas e eficácia;  
Aprendizados destacados durante o processo e ao final do projeto;  
Duas principais dificuldades, e como foram contornadas;  
Dois principais acertos ou escolhas acertadas que fizeram diferença no projeto e por quê;  
Para ficar mais fácil, dê uma olhada nesta apresentação de projeto de um programa que realizamos em Joinville.  
Neste caso, os participantes desenvolveram em squads uma aplicação (backend e frontend) que buscava anunciar animais perdidos ou animais para adoção.  
Assim, pessoas interessadas poderiam colaborar para adotar e/ou encontrar um pet.  
Fiz alguns comentários na apresentação para ajudar vocês! :)  

Quando será a apresentação?  

**O Demoday**  
Evento de apresentação dos projetos finais do programa vai acontecer no dia 31/08/2019, na sede da Escale (mesmo local onde acontecem os encontros do programa). 
Os grupos terão 15 minutos para apresentar o projeto, seguido por 10 minutos de perguntas de uma banca formada por líderes técnicos da empresa + RH. Mas não se preocupem, podem contar com a gente para fazer a melhor apresentação possível :)
