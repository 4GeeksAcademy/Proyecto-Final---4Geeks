from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
#from your_database_module import db  # Importa tu objeto de base de datos, como db


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
    age = db.Column(db.Integer, nullable=True)
    identification = db.Column(db.Integer, unique=True)
    social_security = db.Column(db.Integer, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False) 
    password = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    alergic = db.Column(db.Boolean())
    medicated = db.Column(db.Boolean())

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
    doctors = db.relationship('Doctor', back_populates='speciality')  # Relación inversa

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
    age = db.Column(db.Integer, nullable=True)
    bio = db.Column(db.String(500), unique=False, nullable=True)
    identification = db.Column(db.Integer)
    medical_license = db.Column(db.Integer)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    speciality_id = db.Column(db.Integer, db.ForeignKey("speciality.id"), nullable=True)
    speciality = db.relationship('Speciality', back_populates='doctors')  # Corrección aquí
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    availabilities = db.relationship('DoctorAvailability')

    def __repr__(self):
        return f"ID{self.id}: {self.name} {self.surname}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "surname":self.surname,
            "age": self.age,
            "speciality_id": self.speciality_id,
            "medical_license": self.medical_license,
            "identification": self.identification,
            "is_active": self.is_active,
            "bio": self.bio,
            "email": self.email
        }

    def is_available(self, appointment_time):
        print("Verificando disponibilidad del doctor...")
        print("Doctor ID:", self.id)
        print("Fecha y hora de la cita:", appointment_time)

        appointment_day_of_week = appointment_time.weekday()
        appointment_time_of_day = appointment_time.time()
        print("dia de la cita", appointment_day_of_week)
        print("hora de la cita", appointment_time_of_day)
        for availability in self.availabilities:
            print("Disponibilidad:", availability)
            if availability.day_of_week == appointment_day_of_week and \
                availability.start_time <= appointment_time_of_day <= availability.end_time:
                print("El doctor está disponible en la fecha y hora especificadas.")
                return True
        
        print("El doctor NO está disponible en la fecha y hora especificadas.")
        return False

class DoctorAvailability(db.Model):
    __tablename__ = 'doctor_availability'
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
    doctor_id_relationship = db.relationship('Doctor', overlaps="availabilities")
    day_of_week = db.Column(db.Integer, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    def __repr__(self):
        return f"Doctor Availability ID: {self.id}, Doctor ID: {self.doctor_id}, Day of Week: {self.day_of_week}, Start Time: {self.start_time}, End Time: {self.end_time}"

    def serialize(self):
        return {
            "id": self.id,
            "doctor_id": self.doctor_id,
            "day_of_week": self.day_of_week,
            "start_time": self.start_time.strftime('%H:%M'),
            "end_time": self.end_time.strftime('%H:%M')
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
    speciality_relationship = db.relationship('Speciality')  
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    patient_relationship = db.relationship('Patient')  
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'))
    doctor_id_relationship = db.relationship('Doctor')  
    appointment_date = db.Column(db.DateTime, nullable=False)  
    meeting_id = db.Column(db.Integer, db.ForeignKey('meetings.id'))
    meeting_relationship = db.relationship('Meetings', back_populates='medical_appointment', uselist=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    
    def serialize(self):
        room_url = self.meeting_relationship.room_url if self.meeting_relationship else None
        
        return {
            "id": self.id,
            "speciality_id": self.speciality_id,
            "patient_id": self.patient_id,
            "doctor_id": self.doctor_id,
            "appointment_date": self.appointment_date.isoformat(),
            "meeting": {
                "id": self.meeting_relationship.id if self.meeting_relationship else None,
                "room_id": self.meeting_relationship.room_id if self.meeting_relationship else None,
                "appointment_date": self.meeting_relationship.appointment_date.isoformat() if self.meeting_relationship else None,
                "room_url": room_url
            },
            "is_active": self.is_active
        }


class Meetings(db.Model):
    __tablename__ = 'meetings'

    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.String(255), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    room_url = db.Column(db.String(255), nullable=False)
    medical_appointment = db.relationship('Medical_Appointment', back_populates='meeting_relationship', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "room_id": self.room_id,
            "appointment_date": self.appointment_date.isoformat(),
            "room_url": self.room_url
        }

    @classmethod
    def add_meeting(cls, room_id, appointment_date, room_url):
        new_meeting = cls(room_id=room_id, appointment_date=appointment_date, room_url=room_url)
        db.session.add(new_meeting)
        db.session.commit()

class Profile_Picture(db.Model):
    __tablename__ = 'profiles_pictures'
    id = db.Column(db.Integer, primary_key=True)
    url_picture = db.Column(db.String(255), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id", ondelete="CASCADE"), nullable=True, unique=True)
    patient_id_relationship = db.relationship('Patient', backref='profiles_pictures', uselist=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id", ondelete="CASCADE"), nullable=True, unique=True)
    doctor_id_relationship = db.relationship('Doctor', backref='profiles_pictures', uselist=False)

    def __repr__(self):
        return f"Picture ID: {self.id}, URL: {self.url_picture}, Patient ID: {self.patient_id}, Doctor ID: {self.doctor_id}"

    def serialize(self):
        return {
            "id": self.id,
            "url_picture": self.url_picture,    
            "patient_id": self.patient_id, 
            "doctor_id": self.doctor_id,
        }
    
class Attachment_File(db.Model):
    __tablename__ = 'attachment_file'
    id = db.Column(db.Integer, primary_key=True)
    url_file = db.Column(db.String(255), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("patient.id", ondelete="CASCADE"), nullable=True)
    patient_id_relationship = db.relationship('Patient', backref='attachment_file', uselist=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey("doctor.id", ondelete="CASCADE"), nullable=True)
    doctor_id_relationship = db.relationship('Doctor', backref='attachment_file', uselist=False)
    description = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"File ID: {self.id}, URL: {self.url_file}, Patient ID: {self.patient_id}, Doctor ID: {self.doctor_id}, Description:{self.description}"

    def serialize(self):
        return {
            "id": self.id,
            "url_file": self.url_file,    
            "patient_id": self.patient_id, 
            "doctor_id": self.doctor_id,
            "description":self.description
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