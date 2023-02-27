# ToDo-List App

Desafio elaborado pela Doctuz, cujo a finalidade é desenvolver um To-do list em React Native.

---

## 💬 Tecnologias

- React Native;
- Expo
- TypeScript;
- Yarn;
- Jest;

---

## 💬 Bibliotecas utilizadas

- [Redux.js](https://redux.js.org/):
  Redux é uma biblioteca de gerenciamento de estado independente, que pode ser usada com qualquer biblioteca ou framework. O uso principal do Redux é que podemos usar um estado do aplicativo como um estado global e interagir com o estado de qualquer componente de reação é muito fácil, sejam eles irmãos ou pai-filho.

- [Redux Persist](https://github.com/rt2zz/redux-persist#readme):
  É uma ferramenta usada para salvar por completo o objeto de estado Redux do aplicativo em AsyncStorage. Na inicialização do aplicativo, o Redux Persist recupera esse estado persistente e o salva de volta no Redux.

- [Async Storage](https://react-native-async-storage.github.io/async-storage/docs/usage/):
  é uma ferramenta de armazenamento simples baseado em chave e valor (key-value), não criptografado, assíncrono e persistente, que é global para o aplicativo.

- [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler#readme):
  É uma API declarativa que expõe o sistema de toque e gesto nativo da plataforma ao React Native..

- [NativeBase](https://nativebase.io/):
  NativeBase é uma biblioteca de componentes que permite aos desenvolvedores criar sistemas de design universal. Ele é construído sobre o React Native, permitindo que o desenvolvimento de aplicativos para Android, iOS e Web.

- [React Navigation](https://reactnavigation.org/docs/getting-started/):
  Utilizada para fazer as navegações da aplicação.

- [react-hook-form](https://react-hook-form.com/):
  É uma biblioteca que nos permite manipular formulários.

- [Yup](https://github.com/jquense/yup):
  É uma boblioteca utilizada para validações de formulários.

- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated):
  Biblioteca utilizada para realizar animações na aplicação;

- [react-native-firebase](https://rnfirebase.io/):
  O React Native Firebase é a coleção de pacotes oficialmente recomendada que oferece suporte ao React Native para todos os serviços do Firebase em aplicativos Android e iOS.

- [jest](https://jestjs.io/docs/getting-started):
  É uma estrutura de teste de JavaScript criada pelo Facebook e projetada para ser usada com o React. Ele permite escrever testes unitários para funções e componentes React, além de executar testes de integração para aplicativos React completos.

- [react-native-date-picker](https://github.com/henninghall/react-native-date-picker):
  É um componente selecionador de data para React Native.

- [Moment](https://momentjs.com/):
  É uma biblioteca utilizada para manipular datas.

---

## 💬 Bibliotecas utilizadas para desenvolvimento

- [Eslint](https://eslint.org/):
  O ESLint analisa estaticamente seu código para encontrar problemas rapidamente.

- [Prettier](https://prettier.io/):
  Formatar código da aplicação.

- [Editor config](https://editorconfig.org/):
  Estilos de codificação.

- [Babel](https://babeljs.io/docs/en/):
  Babel é um conjunto de ferramentas usado principalmente para converter o código ECMAScript 2015+ em uma versão compatível com versões anteriores de JavaScript em navegadores ou ambientes atuais e mais antigos

- [Module Resolver](https://github.com/tleunen/babel-plugin-module-resolver):
  Utilizado para importações da aplicação.

---

## 💬 Preparando ambiente de desenvolvimento

- Faça a configuração do seu ambiente seguindo o artigo da [Rocketseat](https://rocketseat.com.br/) disponível [aqui](https://react-native.rocketseat.dev/)

## 🚀 Iniciando o aplicativo ToDo-List

- OBS: Se o sistema operacional for MAC OS, as etapas para as configurações iniciais estão no tópico seguinte ⬇️ (# Configuração APENAS PARA iOS).

1. Abra o projeto no VSCode
2. Entre na branch

   Vá para a branch de desenvolvimento:

   > `$ git checkout develop`

3. No terminal, na raiz do projeto, baixe as dependências:

   > `$ yarn`

   3.1 Feita a instalação das dependências, caso queira rodar a aplicação no próprio dispositvo físico de maneira mais rápida, procure pelo aplicativo do Expo nas lojas de distribuição:

   - Se for Android, [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US);
   - Se for iOS, [Expo](https://apps.apple.com/br/app/expo-go/id982107779);

     3.2 Após a instalação do aplicativo no seu dispositivo móvel, no terminal do VSCode rodar o comando:

   > `$ expo start`

   3.3 Logo em seguida, irá aparecer um QRCode no terminal, e para escanear:

   - Se for Android, abrir o aplicativo do Expo instalado, e selecionar a opção para escanear o QRCode gerado no terminal
   - Se for iOS, basta abrir a câmera do dispositivo que automaticamente irá reconhecer o QRCode e abrir o aplicativo do Expo

     3.4 Por fim, feito as etapas anteriormente, o aplicativo todo-list irá aparecer e poderá ser testado no dispositivo físico.

4. Se deseja rodar pelo emulador, e tendo feita a instalação das dependencias e a configuração de ambiente corretamente, rodar apenas o comando:

- Para Android:
  > `$ yarn run android`
- Para iOS (é necessário ter um Mac):

  > `$ yarn run ios`

  4.1 De forma automatica, irá abrir o emulador rodando o aplicativo todo-list nele.

# 💬 Configuração APENAS PARA iOS

1. Abra o projeto no VSCode
2. Entre na branch

   Vá para a branch de desenvolvimento:

   > `$ git checkout develop`

3. No terminal, na raiz do projeto, baixe as dependências:

   > `$ yarn`

4. Em seguida, entre na pasta do iOS e instale as dependências:

   > `$ cd ios && pod install`

   4.1 Caso o Mac seja a arquitetura M1, M1 Pro ou M2:

   > `$ arch -x86_64 pod install`

---

---

## 🧪 Executando testes na aplicação

1. Abra o projeto no VSCode
2. Entre na branch

   Vá para a branch de desenvolvimento:

   > `$ git checkout develop`

3. No terminal, na raiz do projeto, baixe as dependências:

   > `$ yarn`

4. Logo após baixar as dependências, executar o seguinte comando:

   > `$ yarn test`
