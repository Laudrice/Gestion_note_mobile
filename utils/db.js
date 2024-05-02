import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS etudiants (id INTEGER PRIMARY KEY NOT NULL, nom TEXT, note_math REAL, note_phys REAL, moyenne REAL);'
    );
  });
};

export const fetchEtudiants = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM etudiants;', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
};

export const addEtudiant = (nom, note_math, note_phys, moyenne) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO etudiants (nom, note_math, note_phys, moyenne) VALUES (?, ?, ?, ?);',
        [nom, note_math, note_phys, moyenne],
        (_, { insertId }) => {
          resolve(insertId);
        }
      );
    });
  });
};

export const deleteEtudiant = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM etudiants WHERE id = ?;',
        [id],
        () => {
          resolve();
        }
      );
    });
  });
};

export const fetchEtudiant = async (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'SELECT * FROM etudiants WHERE id = ?',
            [id],
            (_, { rows }) => {
              if (rows.length > 0) {
                resolve(rows.item(0)); // Retourne le premier résultat trouvé
              } else {
                reject(new Error('Student not found'));
              }
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  };


  export const updateEtudiant = async (id, nom, note_math, note_phys, moyenne) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            'UPDATE etudiants SET nom = ?, note_math = ?, note_phys = ?, moyenne = ? WHERE id = ?',
            [nom, note_math, note_phys, moyenne, id],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                resolve(); 

                reject(new Error('No student found with this ID')); 
              }
            },
            (_, error) => {
              reject(error); 
            }
          );
        },
        (error) => {
          reject(error); 
        }
      );
    });
  };
  