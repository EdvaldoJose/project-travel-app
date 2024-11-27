import sequelize from './index';
import User from '../ models/User';

(async () => {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true }); // `force: true` recria as tabelas, use com cautela
    console.log('Banco de dados sincronizado com sucesso.');

    // Exemplo: criando um registro
    await User.create({ name: 'John Doe', email: 'johndoe@example.com' });
    console.log('Usuário criado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  } finally {
    await sequelize.close();
  }
})();
