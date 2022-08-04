import { Request, Response, NextFunction } from "express";
import * as categotyRepository from "../repositories/categoryRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";

export async function validateIds(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { categoryId, disciplineId, teacherId } = req.body;
  if (!categoryId || !disciplineId || !teacherId) {
    return res.sendStatus(422);
  }
  const category = await categotyRepository.findById(+categoryId);
  if (!category) {
    return res.status(404).send("Category not found");
  }
  const discipline = await disciplineRepository.findById(+disciplineId);
  if (!discipline) {
    return res.status(404).send("Discipline not found");
  }
  const teacher = await teacherRepository.findById(+teacherId);
  if (!teacher) {
    return res.status(404).send("Teacher not found");
  }
  const teacherDiscipline = await teacherDisciplineRepository.findByDataId({
    teacherId,
    disciplineId,
  });
  if (!teacherDiscipline) {
    return res.status(404).send("Teacher discipline not found");
  }
  res.locals.teacherDiscipline = teacherDiscipline;
  next();
}
