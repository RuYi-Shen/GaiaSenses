import * as testRepository from "../repositories/testRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

import { Test } from "@prisma/client";

export async function createTest(testInfo: Test) {
  return await testRepository.create(testInfo);
}

export async function findTestsByDiscipline() {
  let terms = await termRepository.findAll();
  let tests = await Promise.all(
    terms.map(async (term) => {
      let disciplinesT = await disciplineRepository.findByTerm(term.id);
      let disciplines = await Promise.all(
        disciplinesT.map(async (discipline) => {
          let teacherDisciplinesT =
            await teacherDisciplineRepository.findByDiscipline(discipline.id);
          let teacherDisciplines = await Promise.all(
            teacherDisciplinesT.map(async (teacherDiscipline) => {
              const teacher = await teacherRepository.findById(
                teacherDiscipline.teacherId
              );
              const testsT = await testRepository.findByTeacherDisciplineId(
                teacherDiscipline.id
              );
              const tests = await Promise.all(
                testsT.map(async (test) => {
                  const category = await categoryRepository.findById(
                    test.categoryId
                  );
                  return { ...test, category };
                })
              );
              return { ...teacherDiscipline, tests, teacher };
            })
          );
          return { ...discipline, teacherDisciplines };
        })
      );
      return { ...term, disciplines };
    })
  );
  return { tests };
}

export async function findTestsByTeacher() {
  let teacherDisciplines = await teacherDisciplineRepository.findAll();
  let tests = await Promise.all(
    teacherDisciplines.map(async (teacherDiscipline) => {
      const discipline = await disciplineRepository.findById(
        teacherDiscipline.disciplineId
      );
      const teacher = await teacherRepository.findById(
        teacherDiscipline.teacherId
      );
      const testsT = await testRepository.findByTeacherDisciplineId(
        teacherDiscipline.id
      );
      const tests = await Promise.all(
        testsT.map(async (test) => {
          const category = await categoryRepository.findById(test.categoryId);
          return { ...test, category };
        })
      );
      return { ...teacherDiscipline, tests, discipline, teacher };
    })
  );
  return { tests };
}

export async function deleteTest(id: number) {
  return await testRepository.deleteById(id);
}
