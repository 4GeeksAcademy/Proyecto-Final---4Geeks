"""empty message

Revision ID: e59cec62fd2d
Revises: ce1f140c67a5
Create Date: 2024-04-10 18:05:33.743583

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e59cec62fd2d'
down_revision = 'ce1f140c67a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorite_medical_appointment')
    with op.batch_alter_table('alergic', schema=None) as batch_op:
        batch_op.drop_column('alergic')
        batch_op.drop_column('is_active')

    with op.batch_alter_table('doctor', schema=None) as batch_op:
        batch_op.add_column(sa.Column('bio', sa.String(length=500), nullable=False))
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.alter_column('surname',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)
        batch_op.alter_column('speciality_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.create_unique_constraint(None, ['bio'])

    with op.batch_alter_table('medical_appointment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('speciality_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('patient_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('doctor_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('appointment_date', sa.DateTime(), nullable=False))
        batch_op.create_foreign_key(None, 'speciality', ['speciality_id'], ['id'])
        batch_op.create_foreign_key(None, 'doctor', ['doctor_id'], ['id'])
        batch_op.create_foreign_key(None, 'patient', ['patient_id'], ['id'])
        batch_op.drop_column('number')

    with op.batch_alter_table('patient', schema=None) as batch_op:
        batch_op.add_column(sa.Column('alergic', sa.Boolean(), nullable=False))
        batch_op.add_column(sa.Column('medicated', sa.Boolean(), nullable=False))

    with op.batch_alter_table('speciality', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('speciality', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)

    with op.batch_alter_table('patient', schema=None) as batch_op:
        batch_op.drop_column('medicated')
        batch_op.drop_column('alergic')

    with op.batch_alter_table('medical_appointment', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('appointment_date')
        batch_op.drop_column('doctor_id')
        batch_op.drop_column('patient_id')
        batch_op.drop_column('speciality_id')

    with op.batch_alter_table('doctor', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.alter_column('speciality_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('surname',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)
        batch_op.drop_column('bio')

    with op.batch_alter_table('alergic', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('alergic', sa.BOOLEAN(), autoincrement=False, nullable=False))

    op.create_table('favorite_medical_appointment',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('medical_appointment_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('speciality_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('patient_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('doctor_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctor.id'], name='favorite_medical_appointment_doctor_id_fkey'),
    sa.ForeignKeyConstraint(['medical_appointment_id'], ['medical_appointment.id'], name='favorite_medical_appointment_medical_appointment_id_fkey'),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], name='favorite_medical_appointment_patient_id_fkey'),
    sa.ForeignKeyConstraint(['speciality_id'], ['speciality.id'], name='favorite_medical_appointment_speciality_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='favorite_medical_appointment_pkey')
    )
    # ### end Alembic commands ###