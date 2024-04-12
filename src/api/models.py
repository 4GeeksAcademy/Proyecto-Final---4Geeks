from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)
    

    def __repr__(self):
        return f"ID {self.id}, nombre {self.username} y email: {self.email}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "password": self.password
            
        }
    


class Patient(db.Model):
    __tablename__ = 'patient'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    identification = db.Column(db.Integer, nullable=False, unique=True)
    social_security = db.Column(db.Integer, nullable=False, unique=True)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    alergic = db.Column(db.Boolean(), nullable=False)
    medicated = db.Column(db.Boolean(), nullable=False)

    def __repr__(self):
        return f"ID {self.id}: {self.name} {self.surname}, identificacion: {self.identification}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname": self.surname,
            "age": self.age,
            "identification": self.identification,
            "social_security": self.social_security,
            "email": self.email,
            "is_active": self.is_active,
            "alergic": self.alergic,
            "medicated": self.medicated
        }


class Alergic(db.Model):
    __tablename__ = 'alergic'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), unique=True, nullable=False)
    patient_id_relationship = db.relationship(Patient)
    alergic_name = db.Column(db.String(250))


    def __repr__(self):
        return f"ID {self.id}: {self.alergic_name}"

    def serialize(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "alergic_name": self.alergic_name,
        }

class Medicated(db.Model):
    __tablename__ = 'medicated'
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), unique=True, nullable=False)
    patient_id_relationship = db.relationship(Patient)
    medicated_name = db.Column(db.String(250))

    def __repr__(self):
        return f"ID {self.id}: {self.medicated_name}"

    def serialize(self):
        return {
            "id": self.id,
            "patiend_id": self.patient_id,
            "medicated_name": self.medicated_name,
        }


class Speciality(db.Model):
    __tablename__ = 'speciality'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f"ID{self.id}: {self.name}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_active": self.is_active
        }

class Doctor(db.Model):
    __tablename__ = 'doctor'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    surname = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer)
    bio = db.Column(db.String(500), unique=True, nullable=False)
    # review = ???
    identification = db.Column(db.Integer)
    medical_license = db.Column(db.Integer)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    speciality_id = db.Column(db.ForeignKey("speciality.id"), nullable=False)
    speciality_id_relationship = db.relationship(Speciality)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)


    #REVISAR SI LA LLAVE DE SPECIALIDAD Y DOCTOR 

    def __repr__(self):
        return f"ID{self.id}: {self.name} {self.surname}"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "speciality_id": self.speciality_id,
            "medical_license": self.medical_license,
            "identification": self.identification,
            "is_active": self.is_active,
            "bio": self.bio
        }

    

    
# class Medical_Appointment(db.Model):
#     __tablename__ = 'medical_appointment'
#     id = db.Column(db.Integer, primary_key=True)
#     number = db.Column(db.Integer)
#     is_active = db.Column(db.Boolean(), unique=False, nullable=False)

#     def __repr__(self):
#         return f"ID{self.id}: Cita {self.number}, estado {self.is_active}"
    
#     def serialize(self):
#         return {
#             "id": self.id,
#             "number": self.id,
#             "is_active": self.is_active
#         }
    
class Medical_Appointment(db.Model):
    __tablename__ = 'medical_appointment'
    id = db.Column(db.Integer, primary_key=True)
    speciality_id = db.Column(db.Integer, db.ForeignKey('speciality.id'))
    speciality_relationship = db.relationship(Speciality) 
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    patient_relationship = db.relationship(Patient) 
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    doctor_id_relationship = db.relationship(Doctor) 
    appointment_date = db.Column((db.DateTime), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f"Cita: {self.id}, Paciente: {self.patient_id}, Doctor: {self.doctor_id}, Especialidad: {self.speciality_id}, Estado: {self.is_active}"
    
    def serialize(self):
        return {
            "id": self.id,
            "medical_appointment_id": self.id,
            "patient_id": self.patient_id,
            "doctor_id": self.doctor_id,
            "speciality": self.speciality_id,
            "is_active": self.is_active
        }

"""class FavoriteSpeciality(db.Model):
    __tablename__ = 'favorite_speciality'
    id = db.Column(db.Integer, primary_key=True)
    medical_appointment_id = db.Column(db.Integer, db.ForeignKey('medical_appointment.id'))
    medical_appointment_relationship = db.relationship(Medical_Appointment) 
    speciality_id = db.Column(db.Integer, db.ForeignKey('speciality.id'))
    speciality_relationship = db.relationship(Speciality) 
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    patient_relationship = db.relationship(Patient) 
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    doctor_id_relationship = db.relationship(Doctor) 

    def __repr__(self):
        return f"Cita: {self.medical_appointment_id}, Paciente: {self.patient_id}, Doctor: {self.doctor_id}, Especialidad: {self.speciality_id}"
    
    def serialize(self):
        return {
            "id": self.id,
            "medical_appointment_id": self.medical_appointment_id,
            "patient_id": self.patient_id,
            "doctor_id": self.doctor_id,
            "speciality": self.speciality_id
        }
    
'''class FavoritePatient(db.Model):
    __tablename__ = 'favorite_patient'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    speciality_id = db.Column(db.Integer, db.ForeignKey('speciality.id'))
    speciality_relationship = db.relationship(Speciality) 
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    patient_relationship = db.relationship(Patient) 
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    doctor_id_relationship = db.relationship(Doctor) 

    def __repr__(self):
        return f"El paciente {self.patient_id} es atendido por el doctor {self.doctor_id} en la especialidad {self.speciality_id}"
    
    def serialize(self):
        return {
            "id": self.id,
            "patient_id": self.patient_id,
            "doctor_id": self.doctor_id,
            "speciality": self.speciality_id
        }'''
    
class FavoriteDoctor(db.Model):
    __tablename__ = 'favorite_doctor'
    id = db.Column(db.Integer, primary_key=True)
    medical_appointment_id = db.Column(db.Integer, db.ForeignKey('medical_appointment.id'))
    medical_appointment_relationship = db.relationship(Medical_Appointment) 
    speciality_id = db.Column(db.Integer, db.ForeignKey('speciality.id'))
    speciality_relationship = db.relationship(Speciality) 
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    patient_relationship = db.relationship(Patient) 
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    doctor_id_relationship = db.relationship(Doctor) 

    def __repr__(self):
        return f"Cita: {self.medical_appointment_id}, Paciente: {self.patient_id}, Doctor: {self.doctor_id}, Especialidad: {self.speciality_id}"
    
    def serialize(self):
        return {
            "id": self.id,
            "medical_appointment_id": self.medical_appointment_id,
            "patient_id": self.patient_id,
            "doctor_id": self.doctor_id,
            "speciality": self.speciality_id
        }"""