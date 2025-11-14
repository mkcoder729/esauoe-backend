from django.contrib import admin
from .models import *

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'is_featured']
    list_filter = ['category', 'is_featured']
    list_editable = ['is_featured', 'proficiency']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'project_type', 'start_date', 'is_featured', 'is_published']
    list_filter = ['project_type', 'is_featured', 'is_published']
    list_editable = ['is_featured', 'is_published']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'experience_type', 'start_date', 'is_current', 'is_featured']  # Added 'is_featured' here
    list_filter = ['experience_type', 'is_current', 'is_featured']
    list_editable = ['is_current', 'is_featured']  # Now both fields are in list_display

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'field_of_study', 'institution', 'start_date', 'is_current', 'is_featured']
    list_filter = ['degree_type', 'is_current', 'is_featured']
    list_editable = ['is_current', 'is_featured']

@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'publish_date', 'is_published', 'is_featured']
    list_filter = ['category', 'is_published', 'is_featured']
    list_editable = ['is_published', 'is_featured']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuing_organization', 'issue_date', 'is_featured']
    list_filter = ['is_featured']
    list_editable = ['is_featured']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'status', 'created_at']
    list_filter = ['status', 'is_archived']
    readonly_fields = ['created_at', 'updated_at', 'ip_address', 'user_agent']

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False if self.model.objects.count() > 0 else super().has_add_permission(request)