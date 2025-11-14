from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.core.validators import MinLengthValidator, URLValidator


class Profile(models.Model):
    """Main profile information"""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField(help_text="Short biography/about me")
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)

    # Social media links
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)

    # SEO and meta
    meta_description = models.TextField(blank=True, help_text="SEO meta description")
    keywords = models.CharField(max_length=300, blank=True, help_text="SEO keywords")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Ensure only one profile instance exists
        if not self.pk and Profile.objects.exists():
            # If you have an existing profile, update it instead of creating new
            existing_profile = Profile.objects.first()
            self.pk = existing_profile.pk
        super().save(*args, **kwargs)


class Skill(models.Model):
    SKILL_CATEGORIES = [
        ('programming', 'Programming Languages'),
        ('framework', 'Frameworks & Libraries'),
        ('tool', 'Tools & Technologies'),
        ('soft', 'Soft Skills'),
        ('design', 'Design'),
        ('language', 'Languages'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=SKILL_CATEGORIES)
    proficiency = models.IntegerField(
        default=50,
        help_text="Proficiency level from 0-100%"
    )
    description = models.TextField(blank=True)
    icon_class = models.CharField(
        max_length=50,
        blank=True,
        help_text="FontAwesome or other icon class (e.g., 'fab fa-python')"
    )
    order = models.IntegerField(default=0, help_text="Display order")
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['category', 'order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(models.Model):
    PROJECT_TYPES = [
        ('web', 'Web Development'),
        ('mobile', 'Mobile App'),
        ('desktop', 'Desktop Application'),
        ('data', 'Data Science'),
        ('ai', 'AI/ML'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    full_description = models.TextField(blank=True)
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES)
    technologies_used = models.TextField(help_text="Comma-separated list of technologies")

    # Media
    featured_image = models.ImageField(upload_to='projects/featured/', blank=True, null=True)
    screenshot_1 = models.ImageField(upload_to='projects/screenshots/', blank=True, null=True)
    screenshot_2 = models.ImageField(upload_to='projects/screenshots/', blank=True, null=True)
    screenshot_3 = models.ImageField(upload_to='projects/screenshots/', blank=True, null=True)

    # Links
    live_demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    documentation_url = models.URLField(blank=True)

    # Dates
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_ongoing = models.BooleanField(default=False)

    # Status
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', 'order', '-start_date']

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('project_detail', kwargs={'slug': self.slug})

    @property
    def duration(self):
        if self.is_ongoing:
            return "Present"
        if self.end_date:
            return f"{self.start_date.year} - {self.end_date.year}"
        return self.start_date.year


class Experience(models.Model):
    EXPERIENCE_TYPES = [
        ('fulltime', 'Full-time'),
        ('parttime', 'Part-time'),
        ('contract', 'Contract'),
        ('freelance', 'Freelance'),
        ('internship', 'Internship'),
    ]

    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    experience_type = models.CharField(max_length=20, choices=EXPERIENCE_TYPES)

    description = models.TextField()
    responsibilities = models.TextField(help_text="List of responsibilities (one per line)")

    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)

    company_logo = models.ImageField(upload_to='experience/logos/', blank=True, null=True)
    company_website = models.URLField(blank=True)

    location = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_current', '-start_date']
        verbose_name = "Work Experience"
        verbose_name_plural = "Work Experiences"

    def __str__(self):
        return f"{self.position} at {self.company}"

    @property
    def duration(self):
        if self.is_current:
            return f"{self.start_date.strftime('%b %Y')} - Present"
        if self.end_date:
            return f"{self.start_date.strftime('%b %Y')} - {self.end_date.strftime('%b %Y')}"
        return self.start_date.strftime('%b %Y')


class Education(models.Model):
    DEGREE_TYPES = [
        ('bachelor', "Bachelor's Degree"),
        ('master', "Master's Degree"),
        ('phd', "PhD"),
        ('diploma', "Diploma"),
        ('certificate', "Certificate"),
        ('other', "Other"),
    ]

    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=100)
    field_of_study = models.CharField(max_length=200)
    degree_type = models.CharField(max_length=20, choices=DEGREE_TYPES)

    description = models.TextField(blank=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)

    institution_logo = models.ImageField(upload_to='education/logos/', blank=True, null=True)
    institution_website = models.URLField(blank=True)

    location = models.CharField(max_length=100, blank=True)
    is_featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_current', '-start_date']
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} in {self.field_of_study} at {self.institution}"


class NewsItem(models.Model):
    NEWS_CATEGORIES = [
        ('achievement', 'Achievement'),
        ('project', 'Project Update'),
        ('article', 'Article/Blog'),
        ('event', 'Event/Talk'),
        ('award', 'Award'),
        ('general', 'General Update'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField()
    excerpt = models.TextField(max_length=300, help_text="Short excerpt for preview")
    category = models.CharField(max_length=20, choices=NEWS_CATEGORIES)

    featured_image = models.ImageField(upload_to='news/', blank=True, null=True)
    external_link = models.URLField(blank=True, help_text="Link to external article or post")

    publish_date = models.DateTimeField(default=timezone.now)
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    tags = models.CharField(max_length=200, blank=True, help_text="Comma-separated tags")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-publish_date', '-created_at']
        verbose_name = "News Item"
        verbose_name_plural = "News Items"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('news_detail', kwargs={'slug': self.slug})


class Certificate(models.Model):
    title = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    credential_id = models.CharField(max_length=100, blank=True)
    credential_url = models.URLField(blank=True)

    issue_date = models.DateField()
    expiration_date = models.DateField(blank=True, null=True)
    does_not_expire = models.BooleanField(default=False)

    certificate_image = models.ImageField(upload_to='certificates/', blank=True, null=True)
    skills = models.ManyToManyField(Skill, blank=True, related_name='certificates')

    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-issue_date', 'order']

    def __str__(self):
        return f"{self.title} from {self.issuing_organization}"


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new')
    is_archived = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"


class SiteSettings(models.Model):
    """Singleton model for site-wide settings"""
    site_name = models.CharField(max_length=100, default="Esau O.E. Portfolio")
    site_description = models.TextField(blank=True)
    maintenance_mode = models.BooleanField(default=False)
    google_analytics_id = models.CharField(max_length=20, blank=True)

    # Social media
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)

    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Site Settings"